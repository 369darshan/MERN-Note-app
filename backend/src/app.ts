
import "dotenv/config";
import express, { NextFunction } from "express";
import NoteModel from "./models/note";
import notesRoutes from "./routes/routes";
import morgan from "morgan";
import createHttpError,{isHttpError} from "http-errors";
import { RequestHandler } from "express";



const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req,res,next)=>{
    next(createHttpError(404,"Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((error: unknown , _req:Request, _res:Response , _next:NextFunction) =>{
//     console.error(error);
//     let errorMessage ='Unknow error occured';
//     let statusCode =500;
//     // if(error instanceof Error){ errorMessage = error.message;}
//     if(isHttpError(error)){
//         statusCode= error.status;
//         errorMessage = error.message;
//     }
//     _res.status(statusCode).json({error: errorMessage});
// });


export default app;