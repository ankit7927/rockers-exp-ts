import { Router } from "express";
import songHandler from "../handlers/song.handler";
import songMiddleware from "../middleware/cache/song.moddleware";

const songRouter: Router = Router();

songRouter.get("/get-all", songHandler.getAllSongs);
songRouter.post("/create-song", songHandler.createSong);
songRouter.get("/get-song/:songId", songMiddleware, songHandler.getSongById);
songRouter.get("/get-album-songs/:albumId", songHandler.getAlbumSongs);

export default songRouter;
