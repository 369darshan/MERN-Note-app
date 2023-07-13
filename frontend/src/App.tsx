import React, { useEffect, useState } from 'react';
import Note from "./components/Note"
import { Note as NoteModel } from '../src/models/note';
import { Container, Row,Col, Button } from 'react-bootstrap';
import styles  from './styles/NotesPage.module.css';
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [ShowAddNoteDialog, setShowAddNoteDialog]= useState(false);

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
  return (
    <Container>
      <Button onClick={()=> setShowAddNoteDialog(true)}>Add New Note</Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note}  className={styles.note}/>
            </Col>
        ))}
      </Row>
      { ShowAddNoteDialog &&
        <AddNoteDialog onDismiss={()=> setShowAddNoteDialog(false)}/>
      }
    </Container>
  );
}

export default App;
