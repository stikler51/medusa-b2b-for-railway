import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { t } from "@/lib/util/translate"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    !!order.shipping_address && (
      <>
        <Heading level="h3" className="mb-2">
          {t("order.deliveryAddress")}
        </Heading>

        {!!order.shipping_address && (
          <div>
            <Text className="txt-medium text-ui-fg-subtle capitalize">
              {order.shipping_address?.company}
            </Text>
            <Text className="txt-medium text-ui-fg-subtle capitalize">
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <Text className="txt-medium text-ui-fg-subtle capitalize">
              {order.shipping_address?.phone}
            </Text>
            <Text className="txt-medium text-ui-fg-subtle">
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </Text>
            <Text className="txt-medium text-ui-fg-subtle">
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}, {order.shipping_address?.province}
              , {order.shipping_address?.country_code?.toUpperCase()}
            </Text>
          </div>
        )}
      </>
    )
  )
}

export default ShippingDetails
