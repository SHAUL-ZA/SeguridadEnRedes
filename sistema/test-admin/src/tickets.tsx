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
  SelectInput,
  RadioButtonGroupInput,
  NumberInput,
  required,
  DateInput,
  useLogin,
  email,
  useUnique,
  usePermissions,
} from "react-admin";
import { useRecordContext } from "react-admin";
import { useNotify, useRedirect, useRefresh } from "react-admin";
import { useAuthState, Loading } from "react-admin";
import { useState, useEffect } from "react";
import { clasificacion, incidencias } from "./utilidades";
import MyLoginPage from "./MyLoginPage";
import authProvider  from "./authProvider";

const TicketTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Buscar" alwaysOn />,
  <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

async function getUserData() {
  try {
    const authUser = await authProvider.getUser();
    // Access the data within the resolved PromiseResult
    const User = authUser;
    console.log("authState: ", User);
  } catch (error) {
    // Handle any errors that might occur during the Promise execution
    console.error(error);
  }
}

export const TicketList = () => {
  //Get the identity of the current user
  const authUser = getUserData();


  console.log("authState: ", authUser);
  //Get the role of the current user

  if (true) {
    return (
      <List filters={postFilters}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="usuario" />
          <TextField source="Título" />
          <TextField source="Descripción" />
          <TextField reference="prioridad" source="Nivel de Prioridad" />
          <EditButton />
        </Datagrid>
      </List>
    );
  } 
};


export const TicketEdit = () => {
  
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  //¿const isLoading = useAuthState();
  //if(isLoading) return <Loading />;
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState< { id: string; nombre: string; categoria: string }[] >([]);

  const onSuccess = () => {
    notify("Ticket actualizado");
    redirect("/tickets");
    refresh();
  };

  
  // Filtrar las subcategorías cuando se seleccione una categoría
  useEffect(() => {
    if (clasificacionSeleccionada) {
      const incidenciasFiltradas = incidencias.filter(
        (incidencias) => incidencias.categoria === clasificacionSeleccionada
      );
      setIncidenciasFiltradas(incidenciasFiltradas);
    } else {
      setIncidenciasFiltradas([]);
    }
  }, [clasificacionSeleccionada]);

  return (
    <Edit title={<TicketTitle />} mutationOptions={{ onSuccess }}>
        <SimpleForm> 
        <TextInput source="Título" validate={[required()]}/>
        <TextInput source="Descripción" validate={[required()]}/>
        <RadioButtonGroupInput validate={[required()]}
          source="Nivel de Prioridad"
          choices={[
            { id: "Critica", name: "Critica" },
            { id: "Alta", name: "Alta" },
            { id: "Intermedia", name: "Intermedia" },
            { id: "Baja", name: "Baja" },
          ]}
        />

        <SelectInput validate={[required()]}
          source="clasificacion" // Asegúrate de que la referencia coincida con tu fuente de datos
          label="Clasificación"
          choices={clasificacion}
          optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la categoría
          onChange={(e) => setClasificacionSeleccionada(e.target.value as string)}
        />

        {clasificacionSeleccionada && (
          <SelectInput validate={[required()]}
            source="incidencia" // Asegúrate de que la referencia coincida con tu fuente de datos
            label="Incidencia"
            choices={incidenciasFiltradas}
            optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la subcategoría
          />
        )}
        <NumberInput source="No. de involucrados" validate={[required()]} min={1} max={20}/>   
        <TextInput source="Resolución" validate={[required()]} />

        <RadioButtonGroupInput validate={[required()]}
          source="Estado"
          choices={[
            { id: "Abierto", name: "Abierto" },
            { id: "EnProceso", name: "En Proceso" },
            { id: "Cerrado", name: "Cerrado" },
          ]}
          defaultValue={"Abierto"}
        />
      </SimpleForm>
    </Edit>
  );
};

export const TicketCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const unique = useUnique();
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState< { id: string; nombre: string; categoria: string }[] >([]);
  const fechaActual = new Date().toISOString().split('T')[0];
  const propetario_id = authProvider.getUser();

  const onSuccess = () => {
    notify("Ticket creado");
    redirect("/tickets");
    refresh();
  };

  // Filtrar las subcategorías cuando se seleccione una categoría
  useEffect(() => {
    if (clasificacionSeleccionada) {
      const incidenciasFiltradas = incidencias.filter(
        (incidencias) => incidencias.categoria === clasificacionSeleccionada
      );
      setIncidenciasFiltradas(incidenciasFiltradas);
    } else {
      setIncidenciasFiltradas([]);
    }
  }, [clasificacionSeleccionada]);

  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <DateInput source="Fecha de creación" label="Fecha de creación" defaultValue={fechaActual} disabled />
        <TextInput source="Propietario" label="Id de propietario" defaultValue={propetario_id} disabled />
        <TextInput source="Aula" label="Aula que reporta" defaultValue={propetario_id} disabled />
        <TextInput source="Título" validate={[required()]} />
        <TextInput source="Descripción" validate={[required()]}/>
        <RadioButtonGroupInput validate={[required()]}
          source="Nivel de Prioridad"
          choices={[
            // Esto lo voy a borrar no se preocupen -atte. David
            { id: "Chamba", name: "Chamba" },
            { id: "Critica", name: "Critica" },
            { id: "Alta", name: "Alta" },
            { id: "Intermedia", name: "Intermedia" },
            { id: "Baja", name: "Baja" },
          ]}
        />

        <SelectInput validate={[required()]}
          source="clasificacion" // Asegúrate de que la referencia coincida con tu fuente de datos
          label="Clasificación"
          choices={clasificacion}
          optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la categoría
          onChange={(e) => setClasificacionSeleccionada(e.target.value as string)}
        />

        {clasificacionSeleccionada && (
          <SelectInput validate={[required()]}
            source="incidencia" // Asegúrate de que la referencia coincida con tu fuente de datos
            label="Incidencia"
            choices={incidenciasFiltradas}
            optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la subcategoría
          />
        )}

        <RadioButtonGroupInput 
          source="Estado"
          choices={[
            { id: "Abierto", name: "Abierto" },
            { id: "EnProceso", name: "En Proceso" },
            { id: "Cerrado", name: "Cerrado" },
          ]}
          defaultValue={"Abierto"}
          disabled
        />
      </SimpleForm>
    </Create>
  );
};
