// in src/MyLoginPage.jsx
import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { Button, Container, Box } from "@mui/material";
import { useWindowSize } from "@uidotdev/usehooks";

const MyLoginPage = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();
  const size = useWindowSize();
  const handleSubmit = (e) => {
    
    e.preventDefault();
    login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: 'url("../recursos/Blurred_Back.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
     <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          height: "500px",
        }}
      >
        <img src="../recursos/LogoBW.svg" alt="Logo"
        style={{
          maxWidth: "100%", 
          maxHeight: "200px", 
          marginBottom: "40px",
        }}
        />
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Usuario"
                name="email"
                type="email"
                value={email}
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  marginLeft: "45px",
                }}
              />
              <input
                placeholder="Contraseña"
                name="password"
                type="password"
                value={password}
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  marginLeft: "45px",
                }}
              />
                <Button variant="contained" onClick={handleSubmit}
                 style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "black",
                  border:"none", 
                  padding: "10px 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer", 
                  width: "152px", 
                  height: "40px",
                  transition: "background-color 0.3s ease-in-out", 
                  marginTop: "40px",
                  marginLeft: "45px",
                }}
                >Login
        </Button>
            </form>
          </Box>
        </Container>
      </Box>
    
  );
};

export default MyLoginPage;
