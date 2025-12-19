"use client"
import Modal from "@/modules/common/components/modal"
import Button from "@/modules/common/components/button"
import { B2BCustomer } from "@/types"
import { Text, toast } from "@medusajs/ui"
import { t } from "@/lib/util/translate"
import { useState } from "react"
import { signout, resetCustomerPassword } from "@/lib/data/customer"
import { useParams } from "next/navigation"

const SecurityCard = ({ customer }: { customer: B2BCustomer }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode, customer?.id as string)
  }

  const handleResetPassword = async () => {
    setSubmitting(true)
    const res = await resetCustomerPassword(customer.email)

    if (res.success) {
      toast.success(t("account.passwordResetEmailSent"))
      setShowConfirmationModal(false)
      handleLogout()
    } else {
      toast.error(res.error)
      setSubmitting(false)
    }
  }

  return (
    <div className="h-fit">
      <Button variant="danger" onClick={() => setShowConfirmationModal(true)}>
        {t("account.resetPassword")}
      </Button>

      <Modal
        isOpen={showConfirmationModal}
        close={() => setShowConfirmationModal(false)}
      >
        <Modal.Title>{t("account.resetPassword")}</Modal.Title>
        <Modal.Body>
          <div className="py-10">
            <Text as="p">{t("account.passwordResetDescriptionStep1")}</Text>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
            disabled={submitting}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={handleResetPassword}
            isLoading={submitting}
          >
            {t("common.continue")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SecurityCard
