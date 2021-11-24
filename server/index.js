// Imports
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Database Connection
import ConnectDB from './database/connection';

// APIs
import Auth from "./API/Auth";

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());

// Application Routes
zomato.use('/auth', Auth);

zomato.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running!! DB Connection Established");
    })
        .catch((error) => {
            console.log("Server is running, but database connection failed...");
            console.log(error);
        })
})

