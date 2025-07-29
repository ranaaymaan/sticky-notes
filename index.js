import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./src/config/.env')})
import express from 'express'
import bootstrap from './src/app.controller.js';
const app = express();
const PORT =3000

bootstrap(app,express)

 app.listen(PORT, () => {console.log('server is running on port '+ PORT)});