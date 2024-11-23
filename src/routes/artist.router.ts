import { Router } from "express";
import artistHandler from "../handlers/artist.handler";

const artistRouter: Router = Router();

artistRouter.get("/get-all", artistHandler.getAllArtists);
artistRouter
  .route("/edit/:artistId")
  .put(artistHandler.updateArtist)
  .delete(artistHandler.deleteArtist);

export default artistRouter;
