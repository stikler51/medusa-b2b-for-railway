import { Text } from "@medusajs/ui"
import { t } from "@/lib/util/translate"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      {t("layout.poweredBy")}
    </Text>
  )
}

export default MedusaCTA
