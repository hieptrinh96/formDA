import { formConfigurations } from "../formConfigurations"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ClientForm from "../ClientForm"

export async function generateStaticParams() {
  const slugs = Object.keys(formConfigurations)
  return slugs.map((slug) => ({
    slug: slug
  }))
}

export default async function FormPage({ params }) {
  const { slug } = await params
  console.log("Received slug: ", slug)
  const config = formConfigurations[slug]
  console.log('Config: ', config)
  if (!config) return <div>Form not found</div>
  return <ClientForm  config={config}/>
}