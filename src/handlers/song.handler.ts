import express, { NextFunction, Request, Response } from "express";
import SongModel from "../models/song.model";
import { Album, Artist, Song } from "../types/song";
import ResponseData from "../utils/response";
import asyncWrapper from "../utils/async.wrapper";
import { SongPostData } from "../types/common";
import albumModel from "../models/album.model";
import artistModel from "../models/artist.model";
import { isValidObjectId } from "mongoose";
import redisClient from "../configs/redis.config";

const songHandler = {
  getAllSongs: asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      let page: number = Number(req.query.page || "0");
      const limit: number = Number(req.query.limit || "20");
      if (page >= 0) page = 1;

      const songs: Song[] = await SongModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate<Album>("album")
        .select("title description album imageUrl")
        .lean()
        .exec();

      return ResponseData(res, "songs fetched", songs);
    }
  ),

  getSongById: asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const songId: string = req.params["songId"];
      if (!isValidObjectId(songId))
        return ResponseData(res, "invalid songId", null, 400);
      const song: Song | null = await SongModel.findById(songId)
        .populate<Album>("album")
        .populate<Artist>("artists")
        .lean()
        .exec();

      await redisClient.set(songId, JSON.stringify(song));

      if (!song) return ResponseData(res, "song not found", null, 404);
      return ResponseData(res, "song found from databased", song);
    }
  ),

  createSong: asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: SongPostData = req.body;
      if (!data.title || !data.album || data.lyrics.length == 0)
        return ResponseData(
          res,
          "title, album and lyrics is required",
          null,
          400
        );

      if (!data.imageUrl) data.imageUrl = "test.jpg";

      const albumData = await albumModel.findOneAndUpdate(
        { name: data.album },
        { name: data.album },
        { upsert: true, new: true }
      );

      const artists: Artist[] = [];
      if (data.artists.length > 0) {
        for (const artist of data.artists) {
          const arts: Artist = await artistModel
            .findOneAndUpdate(
              { name: artist },
              { name: artist },
              { upsert: true, new: true }
            )
            .lean()
            .exec();
          artists.push(arts);
        }
      }

      const newSong = await SongModel.create({
        ...data,
        album: albumData,
        artists: artists
      });

      return ResponseData(res, "song created", newSong, 201);
    }
  ),

  getAlbumSongs: asyncWrapper(
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      const albumId: string = req.params["albumId"];
      if (!isValidObjectId(albumId))
        return ResponseData(res, "invalid albumId", null, 404);

      const albumSongs: Song[] = await SongModel.find({ album: albumId })
        .select("title description imageUrl")
        .lean()
        .exec();

      return ResponseData(res, "albums songs fetched", albumSongs);
    }
  )

  // TODO artists songs
};

export default songHandler;
