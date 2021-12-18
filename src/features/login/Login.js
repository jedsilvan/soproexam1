import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { authenticateAsync, auth, accessToken, status } from "./loginSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _auth = useSelector(auth);
  const _status = useSelector(status);
  const _accessToken = useSelector(accessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      authenticateAsync({
        userNameOrEmailAddress: email,
        password,
        rememberClient: remember,
      })
    );
  }

  useEffect(() => {
    if (_accessToken) {
      navigate("/bookmarks");
    }
  }, [_accessToken, dispatch, navigate]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {_auth?.status === "error" && (
          <Alert variant="danger" style={{ marginTop: 80 }}>
            <Alert.Heading>{_auth.message}</Alert.Heading>
            <p>{_auth.details}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Remember me"
            onChange={() => setRemember(!remember)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!validateForm() || _status === "loading"}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};
