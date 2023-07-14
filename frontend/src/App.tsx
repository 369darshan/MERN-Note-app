import React, { useEffect, useState } from 'react';
import Note from "./components/Note"
import { Note as NoteModel } from '../src/models/note';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import stylesUtils from './styles/utils.module.css';

import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from './components/AddEditNoteDialog';
import { FaPlus } from "react-icons/fa"

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [ShowAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		async function loadNotes() {
			try {
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				alert(error);
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
	return (
		<Container>
			<Button className={`mb-4 ${stylesUtils.blockCenter},${stylesUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
				<FaPlus />
				Add New Note</Button>
			<Row xs={1} md={2} xl={3} className='g-4'>
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
		</Container>
	);
}

export default App;
