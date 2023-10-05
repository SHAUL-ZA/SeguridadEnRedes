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
  const boxwidth= (size.width/4)*3;
  const boxheight= (size.height/3)*2;
  const logowidth= (size.width/12)*4.5;
  const logoheight= size.height/3;
  const handleSubmit = (e) => {
    
    e.preventDefault();
    login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  return (
    <Box sx={{ width: size.width, height: size.height, background: '#fff', }} >
      
      <form style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}} onSubmit={handleSubmit} autoComplete="on" >
        <Box sx={{ width: boxwidth, height: boxheight, boxShadow: 3 }}>
        <Box sx={{ width: logowidth, height: logoheight}}>
        <img src= "../recursos/Logo.png" alt="Logo Fundación por México" width={logowidth} height={logoheight}></img>
        </Box>
        <input
          placeholder="Usuario"
          name="email"
          type="email"
          value={email}
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Constraseña"
          name="password"
          type="password"
          value={password}
          //width="48" 
          //height="48"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
        </Box>
      </form>
      </Box>
      
  );
};

export default MyLoginPage;
