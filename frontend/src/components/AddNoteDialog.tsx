import { Modal, ModalHeader, ModalTitle } from "react-bootstrap";

interface AddNoteDialogProps{
    onDismiss: () => void,
}
const AddNoteDialog = ({onDismiss}:AddNoteDialogProps) => {
    return ( 
        <Modal show onHide={onDismiss}>
            <ModalHeader closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </ModalHeader>
        </Modal>
     );
}
 
export default AddNoteDialog;