// in src/MyAppBar.tsx
import { AppBar } from "react-admin";
import { ToggleThemeButton, useNotify } from "react-admin";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useIdle } from "@uidotdev/usehooks";

export function MyAppBar() {
  const idle = useIdle(5000);
  return (
    <AppBar toolbar={<ToggleThemeButton />}>
      <span className={idle ? "idle" : ""} />
      <CardContent>{idle ? "Inactivo" : "Activo"}</CardContent>
    </AppBar>
  );
}
