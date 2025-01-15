"use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ClientForm = ({ config }) => {
  const [formData, setFormData] = useState({})
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))

    const handleSubmit = e => {
      e.preventDefault()
    }
  }

  return ( 
    <div>
      <div>
        <h1>{config.title}</h1>
        <Form>
          {config.fields.map((field) => (
          <Form.Group controlId={field.name} key={field.name}>
            <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
    </div>
   );
}
 
export default ClientForm;