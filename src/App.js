import React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Login } from "./features/login/Login";
import { Bookmark } from "./features/bookmark/Bookmark";
import { Category } from "./features/category/Category";
import { accessToken, logout } from "./features/login/loginSlice";
import {
  loginInfoAsync,
  loginInfoReset,
  name,
  isConfirmedEmail,
} from "./features/login/loginInfoSlice";
import { bookmarkReset } from "./features/bookmark/bookmarkSlice";
import { categoryReset } from "./features/category/categorySlice";

function App() {
  const dispatch = useDispatch();
  dispatch(loginInfoAsync());

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/bookmarks"
              element={
                <RequireAuth>
                  <Bookmark />
                </RequireAuth>
              }
            />
            <Route
              path="/categories"
              element={
                <RequireAuth>
                  <Category />
                </RequireAuth>
              }
            />
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

function Layout() {
  const _name = useSelector(name);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/bookmarks">sopro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#bookmarks">
                <Link to="/bookmarks">Bookmarks</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/categories">Categories</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {_name && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{_name}</a>
              </Navbar.Text>
              <Nav.Link
                to="/login"
                onClick={() => {
                  dispatch(logout());
                  dispatch(loginInfoReset());
                  dispatch(bookmarkReset());
                  dispatch(categoryReset());
                }}
              >
                Logout
              </Nav.Link>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found!</h1>
    </div>
  );
}

function Verify() {
  return (
    <div>
      <h1>Verify email address</h1>
    </div>
  );
}

function RequireAuth({ children }) {
  const _accessToken = useSelector(accessToken);
  const _isConfirmedEmail = useSelector(isConfirmedEmail);
  const location = useLocation();

  if (!_accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (_isConfirmedEmail !== undefined && !_isConfirmedEmail) {
    return <Navigate to="/verify" state={{ from: location }} />;
  }

  return children;
}

export default App;
