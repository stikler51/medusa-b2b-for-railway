import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { sendOrderConfirmationWorkflow } from "../workflows/order/workflows/confirm-order";

export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  await sendOrderConfirmationWorkflow(container).run({
    input: {
      id: data.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
