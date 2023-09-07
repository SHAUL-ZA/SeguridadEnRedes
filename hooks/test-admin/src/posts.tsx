// in src/posts.tsx
import { log } from "console";
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
    useLogin,
    email,
    useUnique
} from "react-admin";
import { useRecordContext} from "react-admin";
import { useNotify, useRedirect, useRefresh} from "react-admin";
import { useAuthState, Loading } from 'react-admin';

const PostTitle = () => {
     const record = useRecordContext();
     return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

export const PostList = () => (
    <List filters={postFilters}>
     <Datagrid>
      <TextField source="id" />
        <ReferenceField source="userId" label="Usuario" reference="users" />
        <TextField source="titulo" />
       <EditButton />
      </Datagrid>
    </List>
  );

export const PostEdit = () => {
        const notify = useNotify();
        const refresh = useRefresh();
        const redirect = useRedirect();
        //const isLoading = useAuthState();
        //if(isLoading) return <Loading />;
        
        const onSuccess = () => {
        notify('Post actualizado');
        redirect('/posts');
        refresh();
    
        };
        return(
            <Edit title={<PostTitle />} mutationOptions = {{onSuccess}} >
            <SimpleForm>
                <ReferenceInput source="userId" reference="users" />
                <TextInput source="id" />
                <TextInput source="titulo" />
                <TextInput source="contenido" />
            </SimpleForm>
            </Edit>
    );
        
};


export const PostCreate = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const unique = useUnique();

    const onSuccess = () => {
        notify('Post creado');
        redirect('/posts');
        refresh();
    };

    return (
        <Create mutationOptions = {{onSuccess}} >
        <SimpleForm>
           <ReferenceInput source="userId" reference="users" />
           <TextInput source="titulo" validate={unique()} /> 
          <TextInput source="contenido" multiline rows={5} />
         </SimpleForm>
       </Create>
    );

};

 