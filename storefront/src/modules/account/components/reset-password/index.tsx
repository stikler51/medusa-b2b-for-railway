import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { Text } from "@medusajs/ui"
import { useActionState, useEffect } from "react"
import { t } from "@/lib/util/translate"
import { toast } from "@medusajs/ui"
import { resetCustomerPassword } from "@/lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ResetPassword = ({ setCurrentView }: Props) => {
  const [data, formAction] = useActionState(resetCustomerPassword, {
    email: "",
  })

  useEffect(() => {
    if (data?.success) {
      toast.success(t("account.passwordResetEmailSent"))
      setCurrentView(LOGIN_VIEW.LOG_IN)
    } else if (data?.error) {
      toast.error(data.error)
    }
  }, [data, setCurrentView])

  return (
    <div
      className="max-w-sm w-full h-full flex flex-col justify-center gap-6 my-auto"
      data-testid="reset-password-page"
    >
      <Text className="text-4xl text-neutral-950 text-left">
        {t("account.recoverPassword")}
      </Text>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t("account.email")}
            name="email"
            type="email"
            autoComplete="new-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={data?.error} data-testid="login-error-message" />
        <div className="flex flex-col gap-2">
          <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
            {t("account.resetPassword")}
          </SubmitButton>
          <Button
            variant="transparent"
            onClick={() => setCurrentView(LOGIN_VIEW.LOG_IN)}
            className="w-full h-10"
            data-testid="back-to-login-button"
          >
            {t("account.backToLogin")}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
