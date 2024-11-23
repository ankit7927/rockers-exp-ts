import { model, Model, Schema } from "mongoose";
import { Song } from "../types/song";

const songSchema = new Schema<Song>({
  title: { type: String, required: true },
  description: { type: String },
  album: { type: Schema.Types.ObjectId, ref: "Album" },
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  lyrics: [String],
  imageUrl: { type: String, required: true },
  ytvId: String
});

const songModel: Model<Song> = model("Song", songSchema);
export default songModel;
