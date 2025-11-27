// "use client"
import { signup } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Input from "@/modules/common/components/input"
import { HttpTypes } from "@medusajs/types"
import { Checkbox, Label, Select, Text } from "@medusajs/ui"
import { ChangeEvent, useActionState, useState } from "react"
import { t } from "@/lib/util/translate"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  regions: HttpTypes.StoreRegion[]
}

interface FormData {
  email: string
  first_name: string
  last_name: string
  company_name: string
  password: string
  company_address: string
  company_city: string
  company_zip: string
  company_country: string
  currency_code: string
  register_as_company: boolean
  vat_number: string
  okpo: string
}

const initialFormData: FormData = {
  email: "",
  first_name: "",
  last_name: "",
  company_name: "",
  password: "",
  company_address: "",
  company_city: "",
  company_zip: "",
  company_country: "Belarus",
  currency_code: "byn",
  register_as_company: false,
  vat_number: "",
  okpo: "",
}

const placeholder = ({
  placeholder,
  required,
}: {
  placeholder: string
  required: boolean
}) => {
  return (
    <span className="text-ui-fg-muted">
      {placeholder}
      {required && <span className="text-ui-fg-error">*</span>}
    </span>
  )
}

const Register = ({ setCurrentView, regions }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const customerIsValid =
    termsAccepted &&
    !!formData.email &&
    !!formData.first_name &&
    !!formData.last_name &&
    !!formData.password

  const companyIsValid = formData.register_as_company
    ? !!formData.company_name &&
      !!formData.company_address &&
      !!formData.company_city &&
      !!formData.company_zip &&
      !!formData.company_country &&
      !!formData.currency_code &&
      !!formData.vat_number &&
      !!formData.okpo
    : true

  const isValid = customerIsValid && companyIsValid

  const countryNames = regions
    .flatMap((region) =>
      region.countries?.map((country) => country?.display_name || country?.name)
    )
    .filter((country) => country !== undefined)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-start gap-2 my-8"
      data-testid="register-page"
    >
      <Text className="text-4xl text-neutral-950 text-left mb-4">
        {t("account.register")}
      </Text>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label={t("account.email")}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            className="bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label={t("account.firstName")}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            className="bg-white"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            label={t("account.lastName")}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            className="bg-white"
            value={formData.last_name}
            onChange={handleChange}
          />

          <Input
            label={t("account.password")}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            className="bg-white"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              name="register_as_company"
              id="register_as_company-checkbox"
              data-testid="register_as_company-checkbox"
              checked={formData.register_as_company}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({
                  ...prev,
                  register_as_company: !!checked,
                }))
              }}
            ></Checkbox>
            <Label
              id="register_as_company-label"
              className="flex items-center text-ui-fg-base !text-xs hover:cursor-pointer !transform-none"
              htmlFor="register_as_company-checkbox"
              data-testid="register_as_company-label"
            >
              {t("account.registerAsCompany")}
            </Label>
          </div>

          {formData.register_as_company && (
            <>
              <Input
                label={t("account.companyName")}
                name="company_name"
                required
                autoComplete="organization"
                data-testid="company-name-input"
                className="bg-white"
                value={formData.company_name}
                onChange={handleChange}
              />
              <Input
                label={t("account.vatNumber")}
                name="vat_number"
                required
                data-testid="company-vat-input"
                className="bg-white"
                value={formData.vat_number}
                onChange={handleChange}
              />
              <Input
                label={t("account.okpoNumber")}
                name="okpo"
                required
                data-testid="company-okpo-input"
                className="bg-white"
                value={formData.okpo}
                onChange={handleChange}
              />
              <Input
                label={t("account.companyAddress")}
                name="company_address"
                required
                autoComplete="address"
                data-testid="company-address-input"
                className="bg-white"
                value={formData.company_address}
                onChange={handleChange}
              />
              <Input
                label={t("account.companyCity")}
                name="company_city"
                required
                autoComplete="city"
                data-testid="company-city-input"
                className="bg-white"
                value={formData.company_city}
                onChange={handleChange}
              />
              <Input
                label={t("account.companyZip")}
                name="company_zip"
                required
                autoComplete="postal-code"
                data-testid="company-zip-input"
                className="bg-white"
                value={formData.company_zip}
                onChange={handleChange}
              />
              <Select
                name="company_country"
                required
                autoComplete="country"
                data-testid="company-country-input"
                value={formData.company_country}
                onValueChange={handleSelectChange("company_country")}
              >
                <Select.Trigger className="rounded-full h-10 px-4">
                  <Select.Value
                    placeholder={placeholder({
                      placeholder: t("account.selectCountry"),
                      required: true,
                    })}
                  />
                </Select.Trigger>
                <Select.Content>
                  {countryNames?.map((country) => (
                    <Select.Item key={country} value={country}>
                      {country}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </>
          )}
        </div>
        <div className="border-b border-neutral-200 my-6" />
        <ErrorMessage error={message} data-testid="register-error" />
        <div className="flex items-center gap-2">
          <Checkbox
            name="terms"
            id="terms-checkbox"
            data-testid="terms-checkbox"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
          ></Checkbox>
          <Label
            id="terms-label"
            className="flex items-center text-ui-fg-base !text-xs hover:cursor-pointer !transform-none"
            htmlFor="terms-checkbox"
            data-testid="terms-label"
          >
            {t("account.agreeToTerms")}
          </Label>
        </div>
        <SubmitButton
          className="w-full mt-6"
          data-testid="register-button"
          disabled={!isValid}
        >
          {t("account.register")}
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {t("account.alreadyMember")}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.LOG_IN)}
          className="underline"
        >
          {t("account.signIn")}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
