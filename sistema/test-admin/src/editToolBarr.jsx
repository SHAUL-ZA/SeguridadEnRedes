import {Toolbar,SaveButton,Button} from "react-admin";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const CardEditCustomTool = () => {
  const navigate = useNavigate();
  const handleEventRedirect = () => {
    navigate("/tickets");
  };
  return(<Toolbar>
    <Button label="Back" icon={<ArrowBackIcon/>} onClick={handleEventRedirect}/>
    <SaveButton label="Save" icon={<SaveIcon/>}/>
    </Toolbar>);
};