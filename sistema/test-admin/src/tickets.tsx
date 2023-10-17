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
import { Box, CardHeader } from "@mui/material";

const TicketTitle = () => {
  const record = useRecordContext();
  return <span>yhyjuju {record ? `"${record.Titulo}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Buscar" alwaysOn />,
  <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

async function getUserData() {
  try {
    const authUser = await authProvider.getUser();
    // Access the data within the resolved PromiseResult
    return authUser;
  } catch (error) {
    // Handle any errors that might occur during the Promise execution
    console.error(error);
    return null; // Return a default value or handle the error gracefully
  }
}

export const TicketList = () => {
  // Use the useState hook to manage user data and loading state
  const [authUser, setAuthUser] = useState<{ rol: string, id: number, usuario: string, aula: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setAuthUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!authUser) {
    // Handle the case where user data is not available or an error occurred
    return <div>Error fetching user data</div>;
  }
  console.log("authState: ", authUser);
  //Get the role of the current user

  if (authUser.rol == "admin") {
    return (
      <List filters={postFilters}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="usuario" />
          <TextField source="Titulo" />
          <TextField source="Descripcion" />
          <TextField source="Nivel_de_Prioridad" reference="prioridad" />
          <TextField source="Estado" />
          <EditButton />
        </Datagrid>
      </List>
    );
  } 
  else if (authUser.rol == "coordinador_aula") {
    return (
      <List filters={postFilters}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="Usuario" />
          <TextField source="Titulo" />
          <TextField source="Descripcion" />
          <TextField source="Nivel_de_Prioridad" reference="prioridad" />
        </Datagrid>
      </List>
    )
  }
};



export const TicketEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  //¿const isLoading = useAuthState();
  //if(isLoading) return <Loading />;
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("Abierto");
  const [fechaCierre, setFechaCierre] = useState<string | null>(null);
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

  useEffect(() => {
    console.log("estadoSeleccionado: ", estadoSeleccionado);
    if (estadoSeleccionado === 'Cerrado') {
      const currentDate = new Date().toISOString().split('T')[0];
      console.log("currentDate: ", currentDate);
      setFechaCierre(currentDate);
    } else {
      setFechaCierre('');
    }
  }, [estadoSeleccionado]);

  return (

    <Edit title={<TicketTitle/>} >
        <SimpleForm> 
        <TextInput source="Titulo" validate={[required()]} defaultValue="Titulo" disabled/>
        <TextInput source="Descripcion" validate={[required()]} fullWidth multiline/>
        <RadioButtonGroupInput validate={[required()]}
          source="Nivel_de_Prioridad"
          choices={[
            { id: "Critica", name: "Crítica" },
            { id: "Alta", name: "Alta" },
            { id: "Intermedia", name: "Intermedia" },
            { id: "Baja", name: "Baja" },
          ]}
        />

        <SelectInput validate={[required()]}
          source="Clasificacion" // Asegúrate de que la referencia coincida con tu fuente de datos
          label="Clasificación"
          choices={clasificacion}
          optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la categoría
          onChange={(e) => setClasificacionSeleccionada(e.target.value as string)}
        />

        {clasificacionSeleccionada && (
          <SelectInput validate={[required()]}
            source="Incidencia" // Asegúrate de que la referencia coincida con tu fuente de datos
            label="Incidencia"
            choices={incidenciasFiltradas}
            optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la subcategoría
          />
        )}
        <NumberInput source="Involucrados" label="No. de involucrados" validate={[required()]} min={1} max={20} defaultValue="Involucrados"/>
        <TextInput source="Resolucion" validate={[required()]} />

        <RadioButtonGroupInput
          validate={required()}
          source="Estado"
          choices={[
            { id: 'Abierto', name: 'Abierto' },
            { id: 'En_Proceso', name: 'En Proceso' },
            { id: 'Cerrado', name: 'Cerrado' },
          ]}
          value={estadoSeleccionado} // Get the selected value
          onChange={(e) => {
            console.log("e.target.value: ", e.target.value)
            setEstadoSeleccionado(e.target.value)
          }
          } // Update the state
        />
      </SimpleForm>
    </Edit>
  );
};

//Barra de abajo en edit para regresar a /tickets
// export const CardEditCustom = () => {
//   const record = useRecordContext();
//   return (
//     <Box display="flex" justifyContent="space-between">
//       <CardHeader title={<TicketTitle />} />
//       <EditButton basePath="/tickets" record={record} />
//     </Box>
//   );
// }

export const TicketCreate = () => {
  // Use the useState hook to manage user data and loading state
  const [authUser, setAuthUser] = useState<{ rol: string, id: number, usuario: string, aula: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // UseEffect for fetching user data (make sure it comes after state definitions)
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setAuthUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);



  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const unique = useUnique();
  
  // Define and set initial state first
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState< { id: string; nombre: string; categoria: string }[] >([]);
  const fechaActual = new Date().toISOString().split('T')[0];
  const fechaCierre = "";
  const involucrados = 1;


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


  if (loading) {
    return <Loading />;
  }

  if (!authUser) {
    // Handle the case where user data is not available or an error occurred
    return <div>Error fetching user data</div>;
  }
  
  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <DateInput source="Fecha_de_creacion" label="Fecha de creación" defaultValue={fechaActual} disabled />
        <DateInput source="Fecha_de_cierre" label="Fecha de cierre" defaultValue={fechaCierre} disabled style={{ display: 'none' }} />
        <TextInput source="Propietario" label="Id de propietario" defaultValue={authUser.id} disabled />
        <TextInput source="Aula" label="Aula que reporta" defaultValue={authUser.aula} disabled />
        <TextInput source="Titulo" validate={[required()]} />
        <TextInput source="Descripcion" validate={[required()]} fullWidth multiline/>
        <DateInput source="Involucrados" label="Involucrados" defaultValue={involucrados} disabled style={{ display: 'none' }} />
        <RadioButtonGroupInput validate={[required()]}
          source="Nivel_de_Prioridad"
          choices={[
            { id: "Critica", name: "Crítica" },
            { id: "Alta", name: "Alta" },
            { id: "Intermedia", name: "Intermedia" },
            { id: "Baja", name: "Baja" },
          ]}
        />

        <SelectInput validate={[required()]}
          source="Clasificacion" // Asegúrate de que la referencia coincida con tu fuente de datos
          label="Clasificación"
          choices={clasificacion}
          optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la categoría
          onChange={(e) => setClasificacionSeleccionada(e.target.value as string)}
        />

        {clasificacionSeleccionada && (
          <SelectInput validate={[required()]}
            source="Incidencia" // Asegúrate de que la referencia coincida con tu fuente de datos
            label="Incidencia"
            choices={incidenciasFiltradas}
            optionText="nombre" // Utiliza el atributo correcto para mostrar el nombre de la subcategoría
          />
        )}

        <RadioButtonGroupInput 
          source="Estado"
          choices={[
            { id: "Abierto", name: "Abierto" },
            { id: "En_Proceso", name: "En Proceso" },
            { id: "Cerrado", name: "Cerrado" },
          ]}
          defaultValue={"Abierto"}
          disabled
        />
      </SimpleForm>
    </Create>
  );
};
