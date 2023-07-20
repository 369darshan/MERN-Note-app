import { Container } from "react-bootstrap";
import styles from '../styles/NotesPage.module.css';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from "../models/user";


interface NotesPageProps{
    loggedInUser: User |null;
}

const NotesPage = ({loggedInUser}:NotesPageProps) => {
    return ( 
        <Container className={styles.notesPage}>
				<>
					{loggedInUser
					? <NotesPageLoggedInView/>
					: <NotesPageLoggedOutView/>
					}
				</>
				
			</Container>
     );
}
 
export default NotesPage;