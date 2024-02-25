import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Login} from './LoginAction';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post("http://localhost:3000/api/login", { email, password });
          console.log("Axios Response:", response);
              const userInfo = {email};
              dispatch(Login(userInfo));
              navigate('/community');
      } catch (error) {
          console.error("Login Error:", error);
          if (error.response) {
              setErrorMessage(error.response.data);
          } else {
              setErrorMessage('Login failed: An error occurred');
          }
      }
  };
  

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Button type="submit">Login</Button>
                <p> Don&apos;t have an account? <Link to="/signup">Signup here</Link></p>
            </Form>
        </Container>
    );
}

export default LoginForm;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;