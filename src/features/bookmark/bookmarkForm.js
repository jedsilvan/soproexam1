import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { categoryList } from "../category/categorySlice";

const BookmarkForm = ({ onCreate, onUpdate, mode, editValues }) => {
  const categories = useSelector(categoryList);

  const [url, setUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const validateForm = () => {
    return url.length > 0 && shortDescription.length > 0 && categoryId;
  };

  useEffect(() => {
    setUrl(editValues.url);
    setShortDescription(editValues.shortDescription);
    setCategoryId(editValues.categoryId);
  }, [editValues]);

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridShortDescription">
          <Form.Label>Short description</Form.Label>
          <Form.Control
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCategoryId">
          <Form.Label>Category ID</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Choose...</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Col>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: 50 }}
            disabled={!validateForm()}
            onClick={(e) => {
              e.preventDefault();
              setUrl("");
              setShortDescription("");
              const obj = {
                url,
                shortDescription,
                categoryId: parseInt(categoryId),
              };

              if (mode === "Create") {
                onCreate(obj);
              } else {
                onUpdate(obj);
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

export default BookmarkForm;
