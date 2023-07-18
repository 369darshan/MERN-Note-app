import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";
import styles from '../styles/NotesPage.module.css'; 
import stylesUtils from '../styles/utils.module.css';


// interface NotesPageLoggedInViewProps{

// }

const NotesPageLoggedInView = () => {


    const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	const [ShowAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		}
		loadNotes();
	}, []); //if you want execute something only one time when app loads than you have to write [] array

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter(existingNote => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const notesGrid = <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
		{notes.map(note => (
			<Col key={note._id}>
				<Note
					note={note}
					className={styles.note}
					onNoteClicked={(note) => setNoteToEdit(note)}
					onDeleteNoteClicked={deleteNote}
				/>
			</Col>
		))}
	</Row>

    return ( 
        <>
        <Button className={`mb-4 ${stylesUtils.blockCenter},${stylesUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
					<FaPlus />
					Add New Note
				</Button>

				{notesLoading && <Spinner animation='border' />}
				{showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
				{!notesLoading && !showNotesLoadingError &&
					<>
						{
							notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>
						}
					</>
				}

				{ShowAddNoteDialog &&
					<AddEditNoteDialog
						onDismiss={() => setShowAddNoteDialog(false)}
						onNoteSaved={(newNote) => {
							setNotes([...notes, newNote]);
							setShowAddNoteDialog(false);
						}} />
				}
				{
					noteToEdit &&
					<AddEditNoteDialog
						noteToEdit={noteToEdit}
						onDismiss={() => setNoteToEdit(null)}
						onNoteSaved={(updatedNote) => {
							setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
							setNoteToEdit(null);

						}}
					/>
				}
        </>
     );
}
 
export default NotesPageLoggedInView;