import { MiddlewareRoute } from "@medusajs/medusa";
import { MedusaNextFunction, MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { generateUniqueHandle } from "../../utils/transliterate";
import { adminCompaniesMiddlewares } from "./companies/middlewares";
import { adminQuotesMiddlewares } from "./quotes/middlewares";
import { adminApprovalsMiddlewares } from "./approvals/middlewares";
import { adminInvoiceMiddlewares } from "./invoice-config/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...adminCompaniesMiddlewares,
  ...adminQuotesMiddlewares,
  ...adminApprovalsMiddlewares,
  ...adminInvoiceMiddlewares,
  {
    method: ["POST"],
    matcher: "/admin/products",
    middlewares: [
      async (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
        const body = req.body as { title: string; handle?: string };
        if (body && body.title && !body.handle) {
          const url = await generateUniqueHandle(req.scope, body.title);
          body.handle = url;

          // Medusa v2 might use validatedBody if validation ran before this middleware
          if ((req as any).validatedBody) {
            (req as any).validatedBody.handle = url;
          }
        }
        next();
      },
    ],
  },
];
