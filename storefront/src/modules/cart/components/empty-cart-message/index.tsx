import InteractiveLink from "@/modules/common/components/interactive-link"
import { Heading, Text } from "@medusajs/ui"
import { t } from "@/lib/util/translate"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {t("cart.page.emptyCartTitle")}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {t("cart.page.emptyCartDescription")}
      </Text>
      <div>
        <InteractiveLink href="/store">
          {t("cart.page.exploreProducts")}
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
