"use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">{config.title}</h1>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text">
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Row>
              {config.fields.slice(2, config.fields.length).map((field, index) => (
                <Form.Group controlId={field.name} key={field.name} className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                  {index === 1 ? (
                    <Form.Control
                      as="textarea"
                      name={field.name}
                      required={field.required}
                      rows="3" />
                  ) : (
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      required={field.required} />
                  )}
                </Form.Group>
                ))}
              <div className="d-grid">
                <Button variant="primary" type="submit">Submit</Button>
              </div>
            </Form>
        </div>
      </div>
    </div>
   );
}
 
export default ClientForm;