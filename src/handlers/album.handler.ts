import express, { NextFunction } from "express";
import asyncWrapper from "../utils/async.wrapper";
import AlbumModel from "../models/album.model";
import ResponseData from "../utils/response";
import { AlbumPutData } from "../types/common";
import { isValidObjectId } from "mongoose";

const albumHandler = {
  getAllAlbums: asyncWrapper(
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const page: number = Number(req.query.page || "1");
      const limit: number = Number(req.query.limit || "10");

      const allAlbums = await AlbumModel.find({})
        .limit(limit)
        .skip(page == 1 ? 0 : page * limit)
        .lean()
        .exec();

      return ResponseData(res, "fetched all albums", allAlbums);
    }
  ),

  updateAlbum: asyncWrapper(
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const data: AlbumPutData = req.body;
      const albumId: string = req.params["albumId"];

      if (!isValidObjectId(albumId))
        return ResponseData(res, "invalid albumId", null, 400);
      if (!data.name)
        return ResponseData(res, "album name is required", null, 400);

      const updatedAlbum = await AlbumModel.findByIdAndUpdate(
        { _id: albumId },
        { ...data },
        { new: true }
      )
        .lean()
        .exec();
      console.log(updatedAlbum);
      return ResponseData(res, "album updated", updatedAlbum);
    }
  ),

  deleteAlbum: asyncWrapper(
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const albumId: string = req.params["albumId"];
      if (!isValidObjectId(albumId))
        return ResponseData(res, "invalid albumId", null, 400);
      const deleted = await AlbumModel.findByIdAndDelete(albumId);

      return ResponseData(res, "album deleted", deleted);
    }
  )
};

export default albumHandler;
