// in src/App.tsx
import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from './dataProvider';
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList, UserCreateForm} from "./users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from './dashboard';
import { authProvider } from './authProvider';
import { AlbumCreate, AlbumEdit, AlbumList } from "./album";
import {i18nProvider} from "./i18nProvider";
import { MyAppBar } from './MyAppBar';
import { Layout } from 'react-admin';
import MyLoginPage from './MyLoginPage';

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

export const App = () => (
  <Admin layout={MyLayout}  darkTheme={{ palette: { mode: 'dark' } }} loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}  i18nProvider={i18nProvider}>
      <Resource 
          name="posts"
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          icon={PostIcon}
      />
      <Resource
         options={{ label: 'Usuarios' }}
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
  </Admin>
);