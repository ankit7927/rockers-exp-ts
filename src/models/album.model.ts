import { Model, model, Schema } from "mongoose";
import { Album } from "../types/song";

const albumSchema = new Schema<Album>({
  name: String,
  description: String,
  imageUrl: String
});

const albumModel: Model<Album> = model("Album", albumSchema);
export default albumModel;
