"use client"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

const ClientForm = ({ config }) => {
  const [entries, setEntries] = useState([])
  const [currentEntries, setCurrentEntries] = useState({
    'stockNumber': 0,
    'itemDescription': '',
    'quantity': 0
  })
  
  const [userInfo, setUserInfo] = useState({
    'fullName': '',
    'email': ''
  })

  const [errors, setErrors] = useState({})
  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'fullName' || name === 'email') {
      setUserInfo(prevData => ({
        ...prevData, [name]: value
      }))
    }
    else {
      setCurrentEntries(prevData => ({
        ...prevData, [name]: value
      }))
    }
  }

  const addEntry = (e) => {
    e.preventDefault()
    // const newErrors = validateForm()
    // if (Object.keys(newErrors).length > 0) {
      // console.log('Error was found')
      // setErrors(newErrors)
    //   return
    // }
    if (currentEntries.stockNumber && currentEntries.itemDescription && currentEntries.quantity) {
      setEntries([...entries, currentEntries])
      setCurrentEntries({
        'stockNumber': 0,
        'itemDescription': '',
        'quantity': 0
      })
    }
  }

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index))
  }
  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!userInfo.fullName.trim()) newErrors.fullName = "Full name is required";
  //   if (!userInfo.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\\S+@\\S+\\.\\S+/.test(userInfo.email)) {
  //     newErrors.email = "Email is invalid";
  //   }
  //   if (!currentEntries.stockNumber) newErrors.stockNumber = "Stock number is required";
  //   if (!currentEntries.itemDescription.trim()) newErrors.itemDescription = "Item description is required";
  //   if (!currentEntries.quantity) newErrors.quantity = "Quantity is required";
  //   console.log('The newErrors is: ', newErrors)
  //   return newErrors;
  // };
  
  // const validateForm = () => {
  //   let newErrors = {}
  //   if (!userInfo.email.trim()) {
  //     newErrors.email = "Email is required!"
  //   } else if (!/\\S+@\\S+\\.\\S+/.test(userInfo.email)) {
  //     newErrors.email = "Email is invalid."
  //   }
  //   return newErrors
  // }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await fetch('/api/populate-pdf', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(entries)
        })
        setEntries([])
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
                    value={userInfo.fullName}
                    onChange={handleChange}
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userInfo.email}
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
                    value={currentEntries.stockNumber}
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control 
                    type="number"
                    name="quantity"
                    required={true}
                    value={currentEntries.quantity}
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
                  value={currentEntries.itemDescription}
                  rows='3'
                  onChange={handleChange} />
              </Form.Group>
              <div className="d-flex gap-1">
                <Button variant="secondary" onClick={addEntry} className="w-100">Add Item</Button>
                <Button variant="primary" type="submit" className="w-100">Submit</Button>
              </div>
              {entries.length > 0 ?
              <h4 className="mt-4">Current Entries</h4>
              :
              <p></p>
              }
              
              {entries.map((entry, index) => (
                <div key={index} className="mb-2 p-2 border">
                  <p>Stock Number: {entry.stockNumber}, Quantity: {entry.quantity}</p>
                  <p>Description: {entry.itemDescription}</p>
                  <Button variant="danger" size="sm" onClick={() => removeEntry(index)}>Remove</Button>
                </div>
              ))}
            </Form>
        </div>
      </div>
    </div>
   );
}
 
export default ClientForm;