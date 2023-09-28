// in src/posts.tsx
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
} from "react-admin";

import { useRecordContext} from "react-admin";
import { useNotify, useRedirect, useRefresh} from "react-admin";



export const AlbumTitle = () =>{
    const record =useRecordContext();
    return <span role="select">Post{record ? `"${record.title}"`:''}</span>;
}

export const AlbumList = () => (
    <List>
        <Datagrid rowClick="editar">
        <ReferenceField source="userId" label="Usuario" reference="users"  />
        <TextField source="id" />
        <TextField source="titulo" />
        </Datagrid>
    </List>
);
export const AlbumEdit = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () =>{
        notify('Album actualizado');
        redirect('/albums');
        refresh();
    };
        return(
        <Edit title={<AlbumTitle />} mutationOptions = {{onSuccess}} >  
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" label="Usuario" reference="users" />
            <TextInput source="titulo" />
        </SimpleForm>
        </Edit>
        );
};

    

export const AlbumCreate = () =>{
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () =>{
        notify('Album actualizado');
        redirect('/albums');
        refresh();

    };
        return(
        <Create mutationOptions = {{onSuccess}} >
        <SimpleForm>
            <ReferenceInput Input source="userId" label="Usuario" reference="users"/>
            <TextInput source="titulo"/>
        </SimpleForm>
        </Create>
        );  
};