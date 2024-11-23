import { model, Model, Schema } from "mongoose";
import { Collection } from "../types/song";

const collectionSchema = new Schema<Collection>({
  name: String,
  description: String,
  imageUrl: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});

const collectionModel: Model<Collection> = model(
  "Collection",
  collectionSchema
);
export default collectionModel;
