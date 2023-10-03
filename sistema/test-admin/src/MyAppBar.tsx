// in src/MyAppBar.tsx
import { AppBar, Toolbar } from "react-admin";
import { ToggleThemeButton, useNotify } from "react-admin";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useIdle } from "@uidotdev/usehooks";
import Container from '@mui/material/Container';


export function MyAppBar() {
  const idle = useIdle(5000);
  return (
    <AppBar>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        {idle ? "Inactivo" : "Activo"}
      </Typography>
        
    </AppBar>
  );
}
