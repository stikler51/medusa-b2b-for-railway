"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import EmptyCartMessage from "@/modules/cart/components/empty-cart-message"
import SignInPrompt from "@/modules/cart/components/sign-in-prompt"
import ItemsTemplate from "@/modules/cart/templates/items"
import Summary from "@/modules/cart/templates/summary"
import { B2BCustomer } from "@/types/global"
import { Heading } from "@medusajs/ui"
import { useMemo } from "react"
import { t } from "@/lib/util/translate"

// Helper function for Russian plural forms
const getItemCountMessage = (count: number): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  // Special case for 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return t("cart.page.itemsInCart").replace("{count}", count.toString())
  }

  // 1 item
  if (lastDigit === 1) {
    return t("cart.page.itemInCart").replace("{count}", count.toString())
  }

  // 2-4 items
  if (lastDigit >= 2 && lastDigit <= 4) {
    return t("cart.page.itemsInCart2to4").replace("{count}", count.toString())
  }

  // 5+ items
  return t("cart.page.itemsInCart").replace("{count}", count.toString())
}

const CartTemplate = ({ customer }: { customer: B2BCustomer | null }) => {
  const { cart } = useCart()

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const totalItems = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cart?.items]
  )

  return (
    <div className="small:py-12 py-6 bg-neutral-100">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div>
            <div className="flex flex-col py-6 gap-y-6">
              <div className="pb-3 flex items-center">
                <Heading className="text-neutral-950">
                  {getItemCountMessage(totalItems)}
                </Heading>
              </div>
              <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-2">
                <div className="flex flex-col gap-y-2">
                  {!customer && <SignInPrompt />}
                  {cart?.approvals && cart.approvals.length > 0 && (
                    <ApprovalStatusBanner cart={cart} />
                  )}
                  <ItemsTemplate cart={cart} />
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-y-8 sticky top-20">
                    {cart && cart.region && (
                      <Summary
                        customer={customer}
                        spendLimitExceeded={spendLimitExceeded}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
