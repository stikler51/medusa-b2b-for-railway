import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { sendOrderConfirmationWorkflow } from "../workflows/order/workflows/confirm-order";
// import { generateInvoicePdfWorkflow } from "../workflows/invoice-generator/generate-invoice-pdf";

export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {

  // code to generate PDF Files on orders
  // TODO: move it sendOrderConfirmationWorkflow

  // const query = container.resolve("query");
  // const notificationModuleService = container.resolve("notification");

  // const {
  //   data: [order],
  // } = await query.graph({
  //   entity: "order",
  //   fields: [
  //     "id",
  //     "display_id",
  //     "created_at",
  //     "currency_code",
  //     "total",
  //     "email",
  //     "items.*",
  //     "items.variant.*",
  //     "items.variant.product.*",
  //     "shipping_address.*",
  //     "billing_address.*",
  //     "shipping_methods.*",
  //     "tax_total",
  //     "subtotal",
  //     "discount_total",
  //     // add any other fields you need for the email template...
  //   ],
  //   filters: {
  //     id: data.id,
  //   },
  // });

  // const {
  //   result: { pdf_buffer },
  // } = await generateInvoicePdfWorkflow(container).run({
  //   input: {
  //     order_id: data.id,
  //   },
  // });

  // const buffer = Buffer.from(pdf_buffer);

  // Convert to binary string to pass as attachment
  // const binaryString = [...buffer].map((byte) => byte.toString(2).padStart(8, "0")).join("");

  // await notificationModuleService.createNotifications({
  //   to: order.email || "",
  //   template: "order-placed",
  //   channel: "email",
  //   data: order,
  //   attachments: [
  //     {
  //       content: binaryString,
  //       filename: `invoice-${order.id}.pdf`,
  //       content_type: "application/pdf",
  //       disposition: "attachment",
  //     },
  //   ],
  // });

  await sendOrderConfirmationWorkflow(container).run({
    input: {
      id: data.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
