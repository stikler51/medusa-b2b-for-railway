import { Migration } from '@mikro-orm/migrations';

export class Migration20251105201821 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "invoice_config" add column if not exists "vat_number" text null, add column if not exists "okpo" text null, add column if not exists "payment_details" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "invoice_config" drop column if exists "vat_number", drop column if exists "okpo", drop column if exists "payment_details";`);
  }

}
