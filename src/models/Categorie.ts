import { Schema, model } from "mongoose";

const CategorieSchema: Schema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Categorie = model("Categorie", CategorieSchema);
export default Categorie;