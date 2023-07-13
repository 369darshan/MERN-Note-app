import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import { formateDate } from "../utils/formateDate";

interface NoteProps{
    note: NoteModel;
    className?: string;
}

const Note =({note,className}: NoteProps)=>{
    const {
        title,
        text,
        createdAt,
        updatedAt,

    } = note;

    let createdUpdatedText: string;
    if(updatedAt> createdAt){
         createdUpdatedText = "Updated:"+ formateDate(updatedAt);
    }else{
        createdUpdatedText = "Created:"+ formateDate(createdAt);
    }
    return (
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
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