import { Router } from "express";
import postsRouter   from "./posts.route";

const baseRouter = Router();

baseRouter.use('/posts',postsRouter)



export default baseRouter;