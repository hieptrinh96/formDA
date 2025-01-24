"use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

const ClientForm = ({ config }) => {
  const [formData, setFormData] = useState({
    'fullName': '',
    'email': '',
    'stockNumber': 0,
    'itemDescription': '',
    'quantity': 0
  })
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await fetch('/api/populate-pdf', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        setFormData({
          'fullName': '',
          'email': '',
          'stockNumber': 0,
          'itemDescription': '',
          'quantity': 0
        })
        return res
      } catch (e) {
        console.error('Error = ', e)
      }
    }

  return ( 
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">{config.title}</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    >
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}>
                    </Form.Control>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Stock Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockNumber"
                    required={true}
                    value={formData.stockNumber}
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control 
                    type="number"
                    name="quantity"
                    required={true}
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Item Description</Form.Label>
                <Form.Control 
                  as='textarea'
                  name="itemDescription"
                  required={true}
                  value={formData.itemDescription}
                  rows='3'
                  onChange={handleChange} />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" onSubmit={handleSubmit}>Submit</Button>
              </div>
            </Form>
        </div>
      </div>
    </div>
   );
}
 
export default ClientForm;