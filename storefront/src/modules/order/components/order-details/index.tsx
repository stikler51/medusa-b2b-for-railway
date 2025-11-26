import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { t } from "@/lib/util/translate"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const createdAt = new Date(order.created_at)

  return (
    <>
      <Heading level="h3" className="mb-2">
        {t("order.details")}
      </Heading>

      <div className="text-sm text-ui-fg-subtle overflow-auto">
        <div className="flex justify-between">
          <Text>{t("order.orderNumber")}</Text>
          <Text>#{order.display_id}</Text>
        </div>

        <div className="flex justify-between mb-2">
          <Text>{t("order.orderDate")}</Text>
          <Text> {createdAt.toLocaleDateString("ru-RU")}</Text>
        </div>

        <Text>
          {t("order.confirmationSent")}{" "}
          <span className="font-semibold">{order.email}</span>.
        </Text>
      </div>
    </>
  )
}

export default OrderDetails
