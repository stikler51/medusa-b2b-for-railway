import ApprovalCard from "@/modules/account/components/approval-card"
import { Text } from "@medusajs/ui"
import { t } from "@/lib/util/translate"

const PendingCustomerApprovals = ({
  cartsWithApprovals,
}: {
  cartsWithApprovals: any[]
}) => {
  if (cartsWithApprovals.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full">
        {cartsWithApprovals.map((cart) => (
          <ApprovalCard
            key={cart.id}
            cartWithApprovals={cart}
            type="customer"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4"
      data-testid="no-approvals-container"
    >
      <Text className="text-large-semi">{t("account.nothingToSee")}</Text>
      <Text className="text-base-regular">{t("account.noApprovalsYet")}</Text>
    </div>
  )
}

export default PendingCustomerApprovals
