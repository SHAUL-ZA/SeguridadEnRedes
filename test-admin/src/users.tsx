// in src/users.tsx
import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
import MyUrlField from './MyUrlField';export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="mostrar">
                    <TextField source="id" />
                    <TextField source="nombre" />
                    <EmailField source="email" />
                    <TextField source="telefono" />
                    <MyUrlField source="sitio web" />
                    <TextField source="nombre de compañia" />
                </Datagrid>
            )}
        </List>
    );
};