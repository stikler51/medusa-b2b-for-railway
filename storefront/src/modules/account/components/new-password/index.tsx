import { setCustomerPassword } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { clx, Text } from "@medusajs/ui"
import { useActionState, useEffect, useMemo, useState } from "react"
import { t } from "@/lib/util/translate"
import { useSearchParams } from "next/navigation"
import { toast } from "@medusajs/ui"
import { CheckCircleMiniSolid, XCircle } from "@medusajs/icons"
import { passwordSchema } from "@/lib/util/password-schema"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

import { ValidationRule } from "../password-validation-rule"

const NewPassword = ({ setCurrentView }: Props) => {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const token = useMemo(() => {
    return searchParams?.get("token")
  }, [searchParams])
  const email = useMemo(() => {
    return searchParams?.get("email")
  }, [searchParams])

  if (!token || !email) {
    setCurrentView(LOGIN_VIEW.LOG_IN)
    return null
  }

  const [data, formAction] = useActionState(setCustomerPassword, {
    token: token || "",
    email: email || "",
    password: "",
  })

  useEffect(() => {
    if (data?.success) {
      toast.success(t("account.passwordUpdated"))
      setCurrentView(LOGIN_VIEW.LOG_IN)
    } else if (data?.error) {
      toast.error(t(`errors.${data.error}`) || data.error)
    }
  }, [data, setCurrentView])

  const validations = useMemo(() => {
    const result = passwordSchema.safeParse(password)
    const errors = result.success
      ? []
      : result.error.errors.map((e) => e.message)

    return {
      length: password.length >= 8,
      uppercase: !errors.includes("passwordUppercase") && password.length > 0,
      lowercase: !errors.includes("passwordLowercase") && password.length > 0,
      number: !errors.includes("passwordNumber") && password.length > 0,
      special: !errors.includes("passwordSpecial") && password.length > 0,
      match: password === confirmPassword && password.length > 0,
    }
  }, [password, confirmPassword])

  const isFormValid = Object.values(validations).every(Boolean)

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
          <input type="hidden" name="token" value={token || ""} />
          <input type="hidden" name="email" value={email || ""} />

          <Input
            label={t("account.newPassword")}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />

          <div className="flex flex-col gap-y-1 my-2">
            <ValidationRule
              label={t("errors.passwordTooShort")}
              isMet={validations.length}
            />
            <ValidationRule
              label={t("errors.passwordUppercase")}
              isMet={validations.uppercase}
            />
            <ValidationRule
              label={t("errors.passwordLowercase")}
              isMet={validations.lowercase}
            />
            <ValidationRule
              label={t("errors.passwordNumber")}
              isMet={validations.number}
            />
            <ValidationRule
              label={t("errors.passwordSpecial")}
              isMet={validations.special}
            />
          </div>

          <Input
            label={t("account.confirmPassword")}
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            data-testid="confirm-password-input"
          />

          <div className="my-2">
            <ValidationRule
              label={t("errors.passwordsMatch")}
              isMet={validations.match}
            />
          </div>

          <div className="flex flex-col gap-2 w-full border-b border-neutral-200 my-6" />
        </div>
        <ErrorMessage error={data?.message} data-testid="login-error-message" />
        <div className="flex flex-col gap-2">
          <SubmitButton
            data-testid="sign-in-button"
            className="w-full mt-6"
            disabled={!isFormValid}
          >
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

export default NewPassword
