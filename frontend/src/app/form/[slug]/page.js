import { formConfigurations } from "../formConfigurations"
export default function FormPage({ params }) {
  const {slug} = params
  const config = formConfigurations[slug]
  
  const validForms = ['formDA', 'registration']
  if (!validForms.includes(slug)) {
    return <div>Form not found</div>
  }
  return (
    <div>
      <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)} Form</h1>
    </div>
  )
}