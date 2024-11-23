import asyncWrapper from "../utils/async.wrapper";
import express, { Request, Response, NextFunction } from "express";
import { Artist } from "../types/song";
import ArtistModel from "../models/artist.model";
import ResponseData from "../utils/response";
import { ArtistPutData } from "../types/common";
import { isValidObjectId } from "mongoose";

const artistHandler = {
  getAllArtists: asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const artists: Artist[] = await ArtistModel.find().lean().exec();
      return ResponseData(res, "found artists", artists);
    }
  ),

  updateArtist: asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: ArtistPutData = req.body;
      const artistId: string = req.params["artistId"];

      if (!isValidObjectId(artistId))
        return ResponseData(res, "invalid artistId", null, 400);
      if (!data.name)
        return ResponseData(res, "artist name is required", null, 400);

      const updatedArtist = await ArtistModel.findByIdAndUpdate(
        { _id: artistId },
        { ...data },
        { new: true }
      )
        .lean()
        .exec();

      return ResponseData(res, "artist updated", updatedArtist);
    }
  ),

  deleteArtist: asyncWrapper(
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const artistId: string = req.params["artistId"];
      if (!isValidObjectId(artistId))
        return ResponseData(res, "invalid artistId", null, 400);
      const deleted = await ArtistModel.findByIdAndDelete(artistId);

      return ResponseData(res, "artist deleted", deleted);
    }
  )
};

export default artistHandler;
