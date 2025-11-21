import { MedusaContainer, IProductModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { slugify as transliterationSlugify } from "transliteration";

export function transliterate(text: string): string {
  return transliterationSlugify(text);
}

export function slugify(text: string): string {
  return transliterationSlugify(text, {
    lowercase: true,
    separator: "-",
    allowedChars: "a-zA-Z0-9",
  });
}

export async function generateUniqueHandle(
  container: MedusaContainer,
  title: string,
  moduleId: string = Modules.PRODUCT
): Promise<string> {
  const productModule: IProductModuleService = container.resolve(moduleId);
  let handle = slugify(title);
  let uniqueHandle = handle;
  let counter = 1;

  while (true) {
    const existingProducts = await productModule.listProducts(
      {
        handle: uniqueHandle,
      },
      {
        take: 1,
        select: ["id", "handle"],
      }
    );

    if (existingProducts.length === 0) {
      break;
    }

    uniqueHandle = `${handle}-${counter}`;
    counter++;
  }

  return uniqueHandle;
}
