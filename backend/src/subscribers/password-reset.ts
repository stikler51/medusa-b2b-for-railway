import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";
import { Modules } from "@medusajs/framework/utils";

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);
  const config = container.resolve("configModule");

  let resetPasswordUrl = "";

  if (actor_type === "customer") {
    let urlPrefix = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    resetPasswordUrl = `${urlPrefix}/account/?view=new-password&token=${token}&email=${email}`;
  } else {
    const backendUrl = config.admin.backendUrl !== "/" ? config.admin.backendUrl : "http://localhost:9000";
    const adminPath = config.admin.path;
    resetPasswordUrl = `${backendUrl}${adminPath}/reset-password?token=${token}&email=${email}`;
  }

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: "password-reset",
    data: {
      // a URL to a frontend application
      reset_url: resetPasswordUrl,
    },
  });
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
};
