// in src/App.tsx
import { Admin, Resource, ShowGuesser, CustomRoutes} from "react-admin";
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import { TicketList, TicketEdit, TicketCreate, TicketShow } from "./tickets";
import { UserList, UserCreateForm } from "./users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Tablero } from "./tablero";
import  authProvider  from "./authProvider";
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
    dashboard={Tablero}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="tickets"
      list={TicketList}
      edit={TicketEdit}
      create={TicketCreate}
      icon={PostIcon}
      show={TicketShow}
    />

  <CustomRoutes>
          <Route path="/registrarse"  element={<Registrarse />}/>
  </CustomRoutes>
  </Admin>
);
