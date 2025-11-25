import InteractiveLink from "@/modules/common/components/interactive-link"
import { Metadata } from "next"
import { t } from "@/lib/util/translate"

export const metadata: Metadata = {
  title: "404",
  description: t("errors.somethingWentWrong"),
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">
        {t("errors.notFound.title")}
      </h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("errors.notFound.description")}
      </p>
      <InteractiveLink href="/">
        {t("errors.notFound.goToFrontpage")}
      </InteractiveLink>
    </div>
  )
}
