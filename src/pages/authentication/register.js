import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Input } from "../../components";

const Register = () => {
  const [user, loading, error] = useAuthState(auth);

  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, name, password } = state || {};

  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container>
      <h3>Register</h3>
      {/* Name */}
      <Row>
        <Col>
          <Input
            type="text"
            value={name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="Full Name"
          />
        </Col>
      </Row>
      <br></br>

      {/* Email */}
      <Row>
        <Col>
          <Input
            type="text"
            value={email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="E-mail Address"
          />
        </Col>
      </Row>
      <br></br>

      {/* Password */}
      <Row>
        <Col>
          <Input
            type="password"
            value={password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            placeholder="Password"
          />
        </Col>
      </Row>
      <br></br>

      <Button onClick={register} label="Register" />

      <Button
        className="register__btn register__google"
        onClick={signInWithGoogle}
        label="  Register with Google"
      />
      <br></br>
      <div>
        Already have an account? <Link to="/">Login</Link> now.
      </div>
    </Container>
  );
};
export default Register;
