import { Button, Form, Modal, ModalHeader, ModalTitle } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { useForm } from "react-hook-form";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}
const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });
    async function onSubmit(input: NoteInput) {
        try {
            let noteRespose: Note;
            if (noteToEdit) {
                noteRespose = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteRespose = await NotesApi.creatNote(input);

            }

            onNoteSaved(noteRespose);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <ModalHeader closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </ModalHeader>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback 
                            type="invalid">
                            {errors.title?.message};
                        </Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Label>Text:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text",)}

                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;