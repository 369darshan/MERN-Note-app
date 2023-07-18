import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";
import { NoteInput } from "../network/notes_api";
import TextInputField from "./form/TextInputField";

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
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOption={{ required: "Required" }}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />              
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;