import { Request, Response, Router } from "express";
import logger from '../../logger/logger'
const postsRouter = Router();

postsRouter.get('/all',(req:Request,res:Response)=>{
    logger.info('In posts.route.ts');
    
    res.send({"hi":"X"});
})


export default postsRouter;