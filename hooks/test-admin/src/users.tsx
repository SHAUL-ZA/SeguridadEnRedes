// in src/users.tsx
import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
import { SimpleForm, TextInput, Create, useUnique, useNotify, useRefresh, useRedirect } from 'react-admin';




export const UserCreateForm = () => {
    const unique = useUnique(); // hook para validar que el username sea unico 
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Usuario creado');
        redirect('/users');
        refresh();
    };
    return (
        <Create mutationOptions = {{onSuccess}} >
        <SimpleForm>
            <TextInput source="username" validate={unique()} />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
        </Create>
    );
};

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