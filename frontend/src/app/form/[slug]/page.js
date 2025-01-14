import { formConfigurations } from "../formConfigurations"

export default async function FormPage({ params }) {
  const { slug } = await params
  console.log("Received slug: ", slug)
  const config = formConfigurations[slug]
  console.log('Config: ', config)
  if (!config) return <div>Form not found</div>
  return (
    <div>
      <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)} Form</h1>
    </div>
  )
}