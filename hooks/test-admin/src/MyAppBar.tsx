// in src/MyAppBar.tsx
import { AppBar } from 'react-admin';
import { ToggleThemeButton, useNotify } from 'react-admin';


export const MyAppBar = () => (
    <AppBar toolbar={<ToggleThemeButton />} />
);
 