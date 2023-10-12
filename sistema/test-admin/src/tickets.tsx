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
// const permissions = usePermissions();


const TicketTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Buscar" alwaysOn />,
  <ReferenceInput source="userId" label="Usuario" reference="users" />,
];

export const TicketList = () => {
  const { permissions } = usePermissions();
  console.log(permissions);

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
  else if(permissions === "coordinador_aula") {
    return (
      <List filters={postFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="Título" />
        <TextField source="Descripción" />
        <TextField reference="prioridad" source="Nivel de Prioridad" />
      </Datagrid>
    </List>
    );
  }
  else if(permissions === "coordinador_nacional") {
    return (
      <List filters={postFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="Título" />
        <TextField source="Descripción" />
        <TextField reference="prioridad" source="Nivel de Prioridad" />
      </Datagrid>
    </List>
    );
  }
  else if(permissions === "ejecutivo") {
    return (
      <List filters={postFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="Título" />
        <TextField source="Descripción" />
        <TextField reference="prioridad" source="Nivel de Prioridad" />
        <EditButton />
      </Datagrid>
    </List>
    );
  } else {
    return (
      <div>
        <p>You do not have admin permissions to view this page.</p>
        <p>Your permissions: {permissions}</p>
      </div>
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
        <TextInput source="Título" validate={[required()]} />
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
