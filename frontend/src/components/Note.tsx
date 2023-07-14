import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";

import { formateDate } from "../utils/formateDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel;
    onNoteClicked: (note: NoteModel) => void;
    onDeleteNoteClicked: (note: NoteModel) => void;
    className?: string;
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,

    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated:" + formateDate(updatedAt);
    } else {
        createdUpdatedText = "Created:" + formateDate(createdAt);
    }
    return (
        <Card
            onClick={() => onNoteClicked(note)}
            className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {title}
                    <MdDelete className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.noteText}>
                    {text}
                </Card.Text>

            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}
export default Note;