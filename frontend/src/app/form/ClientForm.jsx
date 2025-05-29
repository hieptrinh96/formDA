"use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

const ClientForm = ({ config }) => {
  const [entries, setEntries] = useState([])
  const [currentEntries, setCurrentEntries] = useState({
    'fullName': '',
    'email': '',
    'stockNumber': '',
    'itemDescription': '',
    'quantity': 0
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentEntries(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addEntry = (e) => {
    e.preventDefault()   
    setEntries(prev => [...prev, currentEntries])
    setCurrentEntries({
      fullName: '',
      email: '',
      stockNumber: 0,
      quantity: '',
      itemDescription: ''
    })
  }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await fetch('/api/populate-pdf', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(currentEntries)
        })
        setCurrentEntries({
          'fullName': '',
          'email': '',
          'stockNumber': '',
          'itemDescription': '',
          'quantity': 0
        })
        setUserInfo({
          'fullName': '',
          'email': ''
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
                value={currentEntries.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentEntries.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Stock Number</Form.Label>
              <Form.Control
                type="text"
                name="stockNumber"
                required
                value={currentEntries.stockNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                type="number"
                name="quantity"
                required
                value={currentEntries.quantity}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Item Description</Form.Label>
            <Form.Control 
              as="textarea"
              name="itemDescription"
              required
              value={currentEntries.itemDescription}
              rows="3"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex gap-1">
            <Button variant="secondary" onClick={addEntry} className="w-100" type="button">
              Add Item
            </Button>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </div>

          {entries.length > 0 && (
            <>
              <h4 className="mt-4">Current Entries</h4>
              {entries.map((entry, index) => (
                <div key={index} className="mb-2 p-2 border">
                  <p>Full Name: {entry.fullName}</p>
                  <p>Email: {entry.email}</p>
                  <p>Stock Number: {entry.stockNumber}, </p>
                  <p>Quantity: {entry.quantity}</p>
                  <p>Description: {entry.itemDescription}</p>
                  <Button variant="danger" size="sm" onClick={() => removeEntry(index)}>Remove</Button>
                </div>
              ))}
            </>
          )}
        </Form>
      </div>
    </div>
  </div>
  );
}
 
export default ClientForm;