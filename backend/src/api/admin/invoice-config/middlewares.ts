import { validateAndTransformBody } from "@medusajs/framework/http";
import { PostInvoiceConfigSchema } from "./route";
import { MiddlewareRoute } from "@medusajs/medusa";

export const adminInvoiceMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/invoice-config",
    methods: ["POST"],
    middlewares: [validateAndTransformBody(PostInvoiceConfigSchema)],
  },
];
