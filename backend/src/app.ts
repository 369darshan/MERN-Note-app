import MongoStore from "connect-mongo";
import "dotenv/config";
import express from "express";
import session from "express-session";
import createHttpError from "http-errors";
import morgan from "morgan";
import { requiresAuth } from "./middleware/auth";
import notesRoutes from "./routes/routes";
import userRoutes from "./routes/users";
import env from "./util/validateEnv";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 60*60*1000,
    },
    rolling:true,
    store:MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/users",userRoutes);

app.use("/api/notes",requiresAuth, notesRoutes);


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