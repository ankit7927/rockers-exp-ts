import { Request, Response, Router } from "express";
import songRouter from "./song.router";
import albumRouter from "./album.router";
import artistRouter from "./artist.router";

const apiRouter: Router = Router();

apiRouter.use("/health-check", (request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "server is healthy"
  });
});

apiRouter.use("/songs", songRouter);
apiRouter.use("/albums", albumRouter);
apiRouter.use("/artists", artistRouter);

export default apiRouter;
