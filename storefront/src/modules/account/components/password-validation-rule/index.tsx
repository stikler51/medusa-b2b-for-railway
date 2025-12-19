import { CheckCircleMiniSolid, XCircle } from "@medusajs/icons"
import { clx } from "@medusajs/ui"

export const ValidationRule = ({
  label,
  isMet,
}: {
  label: string
  isMet: boolean
}) => (
  <div className="flex items-center gap-x-2 text-small-regular text-ui-fg-subtle">
    {isMet ? (
      <CheckCircleMiniSolid className="text-ui-fg-interactive flex-shrink-0 text-green-500" />
    ) : (
      <XCircle className="text-ui-fg-muted flex-shrink-0" />
    )}
    <span className={clx({ "text-ui-fg-base": isMet })}>{label}</span>
  </div>
)
