import { useState } from 'react';
import axios from 'axios';
import { SignupFunc } from '../login/LoginFunc';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }
        try {
          const response = await axios.post('http://localhost:3000/api/users/signup', { email, password, confirmPassword });
          console.log(response);
          SignupFunc();
          alert(response.data);
          navigate('/login'); 
      } catch (error) {
          if (error.response) {
              setErrorMessage(error.response.data);
          } else {
              setErrorMessage('An error occurred. Please try again later.');
          }
      }
  };

    return (
        <Container>
            <h1>Signup</h1>
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
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Button type="submit">Signup</Button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </Form>
        </Container>
    );
}

export default SignupForm;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;
