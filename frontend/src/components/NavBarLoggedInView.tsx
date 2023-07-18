import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api"

interface NavBarLoggedInViewProps{
    user:User,
    onLogoutSuccesful: ()=>void;
}

const NavBarLoggedInView = ({user,onLogoutSuccesful}:NavBarLoggedInViewProps) => {
    
    async function logout(){
        try {
            await NotesApi.logout();
            onLogoutSuccesful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    
    return ( 
        <>
            <Navbar.Text className="me-2">
                Signed In as: {user.username};
            </Navbar.Text>
            <Button onClick={logout}>Logout</Button>
        </>
     );
}

export default NavBarLoggedInView;