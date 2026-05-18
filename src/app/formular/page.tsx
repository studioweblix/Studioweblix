import { getBookedSlots } from '@/app/formular/actions'
import { FormularPageClient } from '@/components/formular/FormularPageClient'

export default async function FormularPage({
  searchParams,
}: {
  searchParams: { skip?: string }
}) {
  const bookedSlots = await getBookedSlots()
  const initialStep = searchParams.skip === '1' ? 2 : 1
  return <FormularPageClient initialBookedSlots={bookedSlots} initialStep={initialStep} />
}
