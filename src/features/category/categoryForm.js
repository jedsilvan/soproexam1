import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CategoryForm = ({ onCreate, onUpdate, mode, editValues }) => {
  const [name, setName] = useState("");

  const validateForm = () => {
    return name && name.length > 0;
  };

  useEffect(() => {
    setName(editValues.name);
  }, [editValues]);

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Col style={{ textAlign: "left" }}>
          <Button
            type="primary"
            style={{ marginTop: 50 }}
            disabled={!validateForm()}
            onClick={(e) => {
              e.preventDefault();
              setName("");

              if (mode === "Create") {
                onCreate({ name });
              } else {
                onUpdate({ name });
              }
            }}
          >
            {mode || "Create"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
