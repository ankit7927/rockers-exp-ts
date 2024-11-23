import { model, Model, Schema } from "mongoose";
import { Artist } from "../types/song";

const artistSchema = new Schema<Artist>({
  name: String,
  art: String,
  imageUrl: String
});

const artistModel: Model<Artist> = model<Artist>("Artist", artistSchema);
export default artistModel;
