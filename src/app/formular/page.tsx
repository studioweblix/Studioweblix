import { getBookedSlots } from '@/app/formular/actions'
import { FormularPageClient } from '@/components/formular/FormularPageClient'

export default async function FormularPage() {
  const bookedSlots = await getBookedSlots()
  return <FormularPageClient initialBookedSlots={bookedSlots} />
}
