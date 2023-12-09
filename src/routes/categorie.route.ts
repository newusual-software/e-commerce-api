import { Router } from "express";
import {
  addCategorie,
  getCategorie,
  removeCategorie
} from "../controllers/categorie.controller";

const CategorieRouter: Router = Router();

// add categorie
CategorieRouter.post("/add", addCategorie);

// get all categories
CategorieRouter.get("/get", getCategorie);

// delete categorie
CategorieRouter.delete("/delete", removeCategorie);

export default CategorieRouter;
