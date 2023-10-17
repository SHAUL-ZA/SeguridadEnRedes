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
  Button,
  TabbedShowLayout,
  Tab,
} from "react-admin";
import { useRecordContext } from "react-admin";
import { useNotify, useRedirect, useRefresh, ShowGuesser } from "react-admin";
import { useAuthState, Loading, Show, SimpleShowLayout, DateField, NumberField} from "react-admin";
import { useState, useEffect } from "react";
import { clasificacion, incidencias } from "./utilidades";
import MyLoginPage from "./MyLoginPage";
import authProvider  from "./authProvider";
import { Box, CardHeader,  } from "@mui/material";

const TicketTitle = () => {
  const record = useRecordContext();
  return <span>yhyjuju {record ? `"${record.titulo}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Buscar" alwaysOn />,
  <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

const styles = {
  listContainer: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  datagrid: {
    border: '3px solid #ccc',
    borderRadius: '1px',
    padding: '1px',
  },
  ticketId: {
    fontWeight: 'bold',
    color: '#333',
  },
  ticketTitle: {
    fontSize: '18px',
    color: 'black',
    fontStyle: 'bold',
  },
  ticketDescription: {
    color: '#666',
  },
  ticketPriority: {
    fontWeight: 'bold',
    '&.Alto': {
      color: 'red',
    },
    '&.Medio': {
      color: 'yellow',
    },
    '&.Bajo': {
      color: 'green',
    },
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

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

export const TicketShow = () => {
  const refresh = useRefresh();
  const redirect = useRedirect();
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState<string>("");
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState< { id: string; nombre: string; categoria: string }[] >([]);

  const onSuccess = () => {
    redirect("/tickets");
    refresh();
  };
  return(
  <Show>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Información">
        <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center',}}>
          <TextField source="Título" style={{fontSize: '3rem', fontWeight:'bold'}}/>
        </div>  
          <TextField source="id" style={{fontSize: '1.2rem', fontWeight:'bold'}} />
          <NumberField source="Propietario" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          <TextField source="usuario" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          <DateField source="Fecha de creación"   format="LL" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          <TextField source="Aula"style={{fontSize: '1.2rem', fontWeight:'bold'}} />
          <TextField source="clasificacion" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          <TextField source="incidencia" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="descripción">
          <TextField source="Descripción" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Estado">
          <TextField source="Estado" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          <TextField source="Nivel de Prioridad" style={{fontSize: '1.2rem', fontWeight:'bold'}}/>
          </TabbedShowLayout.Tab>

      </TabbedShowLayout>
      <div style={{    display: 'flex', flexDirection: 'column',alignItems: 'center',}}>
      <Button label="Regresar" onClick={onSuccess}   style={{
          backgroundColor: 'blue',  
          color: 'white',            
          borderRadius: '5px',        
          padding: '10px 20px',       
          fontWeight: 'bold',        
          }}/>
        </div>  
      
  </Show>
  )
};

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
  console.log("authState: ", authUser);//Si les sale en rojo, ignorenlo, es un error de typescript, pero si funciona
  //Get the role of the current user

  if (authUser.rol == "admin") {
    return (
      <List filters={postFilters}>
        <Datagrid rowClick="show">
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
  else if (authUser.rol == "coordinador_aula") {
    return (
      <List filters={postFilters}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="usuario" />
          <TextField source="Título" />
          <TextField source="Descripción" />
          <TextField reference="prioridad" source="Nivel de Prioridad" />
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
        <DateInput source="Fecha de creación" label="Fecha de creación" defaultValue={fechaActual} disabled />
        <TextInput source="Propietario" label="Id de propietario" defaultValue={authUser.id} disabled />
        <TextInput source="Aula" label="Aula que reporta" defaultValue={authUser.aula} disabled />
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
