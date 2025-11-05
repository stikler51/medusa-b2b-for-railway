import { Migration } from '@mikro-orm/migrations';

export class Migration20251105092424 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "company" add column if not exists "okpo" text null, add column if not exists "payment_details" text null;`);
    this.addSql(`alter table if exists "company" rename column "state" to "vat_number";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "company" drop column if exists "okpo", drop column if exists "payment_details";`);

    this.addSql(`alter table if exists "company" rename column "vat_number" to "state";`);
  }

}
