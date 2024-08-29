import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModelForm = ({ transaction, onClose, isShow }) => {
  const [show, setShow] = useState(false);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal
        show={isShow}
        onHide={handleClose}
        centered
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            padding: '1.5rem 2rem',
          }}
        >
          <Modal.Title
            style={{ fontSize: '1.25rem', fontWeight: '500' }}
          >
            Update Transaction Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: '2rem',
            backgroundColor: '#ffffff',
          }}
        >
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Title
              </Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder={transaction.title}
                value={values.title}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Amount
              </Form.Label>
              <Form.Control
                name="amount"
                type="number"
                placeholder={transaction.amount}
                value={values.amount}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Category
              </Form.Label>
              <Form.Select
                name="category"
                value={values.category}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              >
                <option value="">Choose...</option>
                <option value="groceries">Groceries</option>
                <option value="rent">Rent</option>
                <option value="salary">Salary</option>
                <option value="tip">Tip</option>
                <option value="food">Food</option>
                <option value="medical">Medical</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Description
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder={transaction.description}
                value={values.description}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTransactionType">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Transaction Type
              </Form.Label>
              <Form.Select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              >
                <option value="">Choose...</option>
                <option value="credit">Credit</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label
                style={{ fontWeight: '500', color: '#333' }}
              >
                Date
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #dee2e6',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            padding: '1rem 2rem',
          }}
        >
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              borderRadius: '4px',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{
              borderRadius: '4px',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelForm;
