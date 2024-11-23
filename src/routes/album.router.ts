import { Router } from "express";
import albumHandler from "../handlers/album.handler";

const albumRouter: Router = Router();

albumRouter.get("/get-all", albumHandler.getAllAlbums);
albumRouter
  .route("/edit/:albumId")
  .put(albumHandler.updateAlbum)
  .delete(albumHandler.deleteAlbum);

export default albumRouter;
