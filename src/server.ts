import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan';
import baseRouter from './api/routes';
import config from './config/config';
import logger  from "./logger/logger";
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config();

const app = express();
const port = process.env.NODE_SERVER_PORT || '8000';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Show routes called in console during development

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// if (process.env.NODE_ENV === 'production') {
//   app.use(helmet());
// }

app.get('/',(req,res,next)=>{
  res.send('<h1>Hello World</h1>')
})

app.use('/'+process.env.BASE_API_PATH,baseRouter)

// Listen on port 8080
module.exports = app.listen(port,() => {
   
   logger.info("Listening on port " + port)
    
  });