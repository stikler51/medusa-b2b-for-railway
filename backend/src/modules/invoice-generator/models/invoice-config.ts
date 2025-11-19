import { model } from "@medusajs/framework/utils";

export const InvoiceConfig = model.define("invoice_config", {
  id: model.id().primaryKey(),
  company_name: model.text(),
  company_address: model.text(),
  company_phone: model.text(),
  company_email: model.text(),
  company_logo: model.text().nullable(),
  notes: model.text().nullable(),
  vat_number: model.text().nullable(), // УНП
  okpo: model.text().nullable(), // ОКПО
  payment_details: model.text().nullable(),
});
