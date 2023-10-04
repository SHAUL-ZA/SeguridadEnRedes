// in src/App.tsx
import { Admin, Resource, ShowGuesser, CustomRoutes} from "react-admin";
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import { TicketList, TicketEdit, TicketCreate } from "./tickets";
import { UserList, UserCreateForm } from "./users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./dashboard";
import { authProvider } from "./authProvider";
import { AlbumCreate, AlbumEdit, AlbumList } from "./album";
import { i18nProvider } from "./i18nProvider";
import { MyAppBar } from "./MyAppBar";
import { Layout } from "react-admin";
import MyLoginPage from "./MyLoginPage";
import Registrarse from "./registrarse";


const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

export const App = () => (
  <Admin
    loginPage={MyLoginPage}  
    layout={MyLayout}
    darkTheme={{ palette: { mode: "dark" } }} 
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="tickets"
      list={TicketList}
      edit={TicketEdit}
      create={TicketCreate}
      icon={PostIcon}
    />
    <Resource
      options={{ label: "Usuarios" }}
      name="users"
      list={UserList}
      show={ShowGuesser}
      create={UserCreateForm}
      recordRepresentation="name"
      icon={UserIcon}
    />
    <Resource
      name="albums"
      list={AlbumList}
      edit={AlbumEdit}
      create={AlbumCreate}
      icon={PostIcon}
    />


  <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
  </CustomRoutes>
  </Admin>
);
