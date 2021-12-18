import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

const _Table = ({ headers, items, onDelete, onEdit, isAdmin = false }) => {
  return (
    <Row>
      <Col md="auto">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {headers && headers.map((i) => <th key={i.key}>{i.name}</th>)}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item, key) => (
                <tr key={key}>
                  {headers &&
                    headers.map((header) => (
                      <td key={header.key}>{item[header.key]}</td>
                    ))}
                  {isAdmin && (
                    <td>
                      <Nav>
                        <Nav.Item>
                          <Nav.Link
                            onClick={() =>
                              onEdit({
                                ...item,
                              })
                            }
                          >
                            Edit
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link onClick={() => onDelete(item.id)}>
                            Delete
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default _Table;
