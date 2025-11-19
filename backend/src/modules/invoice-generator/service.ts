import { MedusaService } from "@medusajs/framework/utils";
import { InvoiceConfig } from "./models/invoice-config";
import { Invoice, InvoiceStatus } from "./models/invoice";
import PdfPrinter from "pdfmake";
import { InferTypeOf, OrderDTO, OrderLineItemDTO } from "@medusajs/framework/types";
import axios from "axios";

import path from "path";

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "fonts/Roboto/Roboto-Bold.ttf"),
    italics: path.join(__dirname, "fonts/Roboto/Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "fonts/Roboto/Roboto-BoldItalic.ttf"),
  },
}; 

const printer = new PdfPrinter(fonts);

type GeneratePdfParams = {
  order: OrderDTO;
  items: OrderLineItemDTO[];
};

class InvoiceGeneratorService extends MedusaService({
  InvoiceConfig,
  Invoice,
}) {
  async generatePdf(
    params: GeneratePdfParams & {
      invoice_id: string;
    }
  ): Promise<Buffer> {
    const invoice = await this.retrieveInvoice(params.invoice_id);

    // Generate new content
    const pdfContent = Object.keys(invoice.pdfContent).length
      ? invoice.pdfContent
      : await this.createInvoiceContent(params, invoice);

    await this.updateInvoices({
      id: invoice.id,
      pdfContent,
    });

    // get PDF as a Buffer
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      const pdfDoc = printer.createPdfKitDocument(pdfContent as any);

      pdfDoc.on("data", (chunk) => chunks.push(chunk));
      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });
      pdfDoc.on("error", (err) => reject(err));

      pdfDoc.end(); // Finalize PDF stream
    });
  }

  private async createInvoiceContent(
    params: GeneratePdfParams,
    invoice: InferTypeOf<typeof Invoice>
  ): Promise<Record<string, any>> {
    // Get invoice configuration
    const invoiceConfigs = await this.listInvoiceConfigs();
    const config = invoiceConfigs[0] || {};

    // Create table for order items
    const itemsTable = [
      [
        { text: "Наименование и краткая характеристика товара (артикул, марка, сорт)", style: "tableHeader" },
        { text: "Ед. изм.", style: "firstTableHeader" },
        { text: "Кол-во", style: "tableHeader" },
        { text: "Цена, руб.", style: "tableHeader" },
        { text: "Розн.(опт.) надбавка в т.ч., %", style: "tableHeader" },
        { text: "Сумма без НДС, руб.", style: "tableHeader" },
        { text: "Ставка НДС, %", style: "tableHeader" },
        { text: "Сумма НДС, руб.", style: "tableHeader" },
        { text: "Ставка НП в т.ч., %", style: "tableHeader" },
        { text: "Сумма НП, руб.", style: "tableHeader" },
        { text: "Сумма, руб.", style: "tableHeader" },
      ],
      ...(await Promise.all(
        params.items.map(async (item) => {
          const taxLine = item.tax_lines?.find((tl) => tl.code === "НДС");
          return [
            { text: `${item.title} | ${item.variant_sku ?? ""}` || "", style: "firstTableRow" },
            { text: "шт.", style: "tableRow" },
            { text: item.quantity.toString(), style: "tableRow" },
            { text: await this.formatAmount(item.unit_price, params.order.currency_code), style: "tableRow" },
            { text: "-", style: "tableRow" },
            { text: await this.formatAmount(Number(item.subtotal), params.order.currency_code), style: "tableRow" },
            { text: taxLine?.rate ? `${taxLine.rate}%` : "-", style: "tableRow" },
            { text: taxLine?.subtotal ? await this.formatAmount(Number(taxLine.subtotal), params.order.currency_code) : "-", style: "tableRow" },
            { text: "-", style: "tableRow" },
            { text: "-", style: "tableRow" },
            { text: await this.formatAmount(Number(item.total), params.order.currency_code), style: "tableRow" },
          ];
        })
      )),
      ...(Number(params.order.discount_total) > 0 ? [[
        {
          text: "Скидка:",
          style: "totalLabel",
          colSpan: 10,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
          text: await this.formatAmount(Number(params.order.discount_total), params.order.currency_code),
          style: "totalValue",
        },
      ]] : []),
      ...(Number(params.order.shipping_methods?.[0]?.total) > 0 ? [[
        {
          text: "Доставка:",
          style: "totalLabel",
          colSpan: 10,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
          text: await this.formatAmount(Number(params.order.shipping_methods?.[0]?.total || 0), params.order.currency_code),
          style: "totalValue",
        },
      ]] : []),
      [
        {
          text: "Итого:",
          style: "totalLabel",
          colSpan: 5,
        },
        {},
        {},
        {},
        {},
        {
          text: await this.formatAmount(Number(params.order.subtotal), params.order.currency_code),
          style: "totalValue",
        },
        {
          text: '',
          style: "totalValue",
        },
        {
          text: await this.formatAmount(Number(params.order.tax_total), params.order.currency_code),
          style: "totalValue",
        },
        {
          text: '',
          style: "totalValue",
        },
        {
          text: '',
          style: "totalValue",
        },
        {
          text: await this.formatAmount(Number(params.order.total), params.order.currency_code),
          style: "totalValue",
        },
      ]
    ];

    const billingAddress = params.order.billing_address
      ? `${params.order.billing_address.postal_code || ""}, ${params.order.billing_address.city || ""}
      ${params.order.billing_address.address_1 || ""}${params.order.billing_address.address_2 ? ` ${params.order.billing_address.address_2}` : ""}`
      : "";

    const companyAddress = params.order.company
      ? `${params.order.company.zip || ""}, ${params.order.company.city || ""} ${params.order.company.address || ""}`
      : "";

    // return the PDF content structure
    return {
      pageSize: "A4",
      pageMargins: [40, 20, 40, 20],
      content: [
        {
          columnGap: 40,
          columns: [
            {
              width: "*",
              stack: [
                ...(config.company_logo
                  ? [
                      {
                        image: await this.imageUrlToBase64(config.company_logo),
                        width: 80,
                        height: 40,
                        fit: [80, 40],
                      },
                    ]
                  : [
                    {
                      text: config.company_name || "Your Company Name",
                      style: "companyName",
                    }
                  ]),
              ],
            },
            /** Invoice Details */
            {
              width: "*",
              stack: [
                {
                  text: "Счет-фактура",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  table: {
                    widths: [80, 120],
                    body: [
                      [
                        { text: "№", style: "label" },
                        {
                          text: params.order.display_id.toString().padStart(6, "0"),
                          style: "value",
                        },
                      ],
                      [
                        { text: "от", style: "label" },
                        {
                          text: new Date(params.order.created_at).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }),
                          style: "value",
                        },
                      ],
                    ],
                  },
                  layout: "noBorders",
                  margin: [0, 0, 0, 20],
                },
              ],
            },
          ],
        },
        {
          text: "\n",
        },
        {
          columnGap: 40,
          columns: [
          /** Company Details */
            {
              width: "*",
              stack: [
                {
                  text: "Поставщик и его адрес:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  text: config.company_name,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: config.company_address,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: `УНП: ${config.vat_number}`,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: `ОКПО: ${config.okpo}`,
                  style: "companyAddress",
                  margin: [0, 0, 0, 16],
                },
                config.payment_details && {
                  text: config.payment_details,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
              ],
            },
          /** Billing and Shipping Addresses */
            {
              width: "*",
              stack: [
                {
                  text: "Плательщик и его адрес:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  text: params.order?.customer?.company_name ?? `${params.order.customer.first_name || ""} ${params.order.customer.last_name || ""}`,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: companyAddress ? companyAddress : billingAddress,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: `УНП: ${params.order.company.vat_number}`,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
                {
                  text: `ОКПО: ${params.order.company.okpo}`,
                  style: "companyAddress",
                  margin: [0, 0, 0, 16],
                },
                {
                  text: params.order.company.payment_details,
                  style: "companyAddress",
                  margin: [0, 0, 0, 4],
                },
              ],
            },
          ],
        },
        {
          text: "\n",
        },
        /** Items Table */
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: itemsTable,
          },
          layout: {
            fillColor: function (rowIndex: number) {
              return rowIndex === 0 ? "#f8f9fa" : null;
            },
            hLineWidth: function (i: number, node: any) {
              return i === 0 || i === node.table.body.length ? 0.8 : 0.3;
            },
            vLineWidth: function (i: number, node: any) {
              return 0.3;
            },
            hLineColor: function (i: number, node: any) {
              return i === 0 || i === node.table.body.length ? "#cbd5e0" : "#e2e8f0";
            },
            vLineColor: function () {
              return "#e2e8f0";
            },
            paddingLeft: function () {
              return 2;
            },
            paddingRight: function () {
              return 2;
            },
            paddingTop: function () {
              return 6;
            },
            paddingBottom: function () {
              return 6;
            },
          },
        },
        {
          text: "\n",
        },
        {
          text: Number(params.order.tax_total) == 0 ? "Без НДС. Согласно главе 32 Налогового кодекса Республики Беларусь" : "",
          style: "notesText",
        },
        {
          text: "\n",
        },
        {
          columnGap: 40,
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: "Срок оплаты: 7 дней",
                  style: "notesText",
                  margin: [0, 0, 0, 2]
                },
                {
                  text: "Счет-фактура является протоколом согласования цен.",
                  style: "notesText",
                  margin: [0, 0, 0, 2]
                },
                {
                  text: "Цены: розничные.",
                  style: "notesText",
                  margin: [0, 0, 0, 2]
                },
              ],
            },
            {
              width: "*",
              stack: [
                {
                  text: "Условия достаки: " + params.order.shipping_methods?.[0].name,
                  style: "notesText",
                  margin: [0, 0, 0, 2]
                },
              ],
            }
          ]
        },
        {
          text: "\n",
        },
        {
          text: "Для получения необходимы: доверенность, паспорт, счет-фактура, копия платежного поручения.",
          style: "notesText"
        },
        {
          text: "\n\n",
        },
        {
          columnGap: 40,
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: "Исполнитель:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  text: config.company_name,
                  style: "notesText",
                },
                {
                  text: "\n\n"
                },
                {
                  text: "Е.Л. Балашевич",
                  alignment: "right",
                  style: 'notesText'
                },
                {
                  text: "\n\n"
                },
                {
                  text: "М.П.",
                  style: 'notesText'
                },
              ]
            },
            {
              width: "*",
              stack: [
                {
                  text: "Заказчик:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  text: params.order?.customer?.company_name ?? `${params.order.customer.first_name || ""} ${params.order.customer.last_name || ""}`,
                  style: "notesText",
                },
                {
                  text: "\n\n"
                },
                {
                  text: "\n",
                  alignment: "right"
                },
                {
                  text: "\n\n"
                },
                {
                  text: "М.П.",
                  style: 'notesText'
                },
              ]
            }
          ]
        }
        /** Notes Section */
        // ...(config.notes
        //   ? [
        //       {
        //         text: "Notes",
        //         style: "sectionHeader",
        //         margin: [0, 20, 0, 10],
        //       },
        //       {
        //         text: config.notes,
        //         style: "notesText",
        //         margin: [0, 0, 0, 20],
        //       },
        //     ]
        //   : []),
        // {
        //   text: "Thank you for your business!",
        //   style: "thankYouText",
        //   alignment: "center",
        //   margin: [0, 30, 0, 0],
        // },
      ],
      styles: {
        companyName: {
          fontSize: 16,
          bold: true,
          color: "#1a365d",
          margin: [0, 0, 0, 5],
        },
        companyAddress: {
          fontSize: 10,
          color: "#4a5568",
          lineHeight: 1.3,
        },
        companyContact: {
          fontSize: 10,
          color: "#4a5568",
        },
        invoiceTitle: {
          fontSize: 24,
          bold: true,
          color: "#2c3e50",
        },
        label: {
          fontSize: 10,
          color: "#6c757d",
          margin: [0, 0, 8, 0],
        },
        value: {
          fontSize: 10,
          bold: true,
          color: "#2c3e50",
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          color: "#2c3e50",
          backgroundColor: "#f8f9fa",
          padding: [8, 12],
        },
        addressText: {
          fontSize: 10,
          color: "#495057",
          lineHeight: 1.3,
        },
        firstTableHeader : {
          fontSize: 8,
          bold: true,
          color: "#495057",
          alignment: "left",
        },
        tableHeader: {
          fontSize: 8,
          bold: true,
          color: "#495057",
          alignment: "center",
        },
        firstTableRow: {
          fontSize: 9,
          color: "#495057",
        },
        tableRow: {
          fontSize: 9,
          color: "#495057",
          alignment: "center",
        },
        totalLabel: {
          fontSize: 9,
          bold: true,
          color: "#495057",
        },
        totalValue: {
          fontSize: 9,
          bold: true,
          color: "#2c3e50",
          alignment: "center",
        },
        notesText: {
          fontSize: 9,
          color: "#2c3e50",
          lineHeight: 1.4,
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };
  }

  private async formatAmount(amount: number, currency: string): Promise<string> {
    return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  }

  private async imageUrlToBase64(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data).toString("base64");
    const mimeType = response.headers["content-type"] || "image/png";
    return `data:${mimeType};base64,${base64}`;
  }
}

export default InvoiceGeneratorService;
