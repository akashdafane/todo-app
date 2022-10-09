import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input, Button } from "../../components";
import { constants } from "../../constants/constants";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state || {};

  const { button, emailPlaceholder, passwordPlaceholder } =
    constants?.loginPage || {};

  const { googleLabel, loginLabel } = button || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          <Input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder={emailPlaceholder}
          />
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Input
            type="password"
            value={password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            placeholder={passwordPlaceholder}
            isPassword
          />
        </Col>
      </Row>
      <br></br>

      <Button
        onClick={() => logInWithEmailAndPassword(email, password)}
        label={loginLabel}
      />

      <Button onClick={signInWithGoogle} label={googleLabel} />

      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </Container>
  );
};

export default Login;
