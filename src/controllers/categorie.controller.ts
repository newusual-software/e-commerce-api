import { Request, Response, NextFunction } from "express";
import Categorie from "../models/Categorie";

// @Des: Add Categorie
// @Method: POST
// @Access: Public
export const addCategorie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.cat) {
      await Categorie.create({
        name: req.body.cat
      })
        .then((data) => res.status(201).send(data))
        .catch((error) => console.log(error));
    } else {
      return;
    }
  } catch (error) {
    next(error);
  }
};

// @Des: Remove Categorie
// @Method: DELETE
// @Access: Public
export const removeCategorie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.id) {
      await Categorie.findByIdAndDelete(req.body.id)
        .then((data) => res.status(200).send(data))
        .catch((error) => console.log(error));
    } else {
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const getByQuery = async (req: Request,res: Response,next: NextFunction) => {
    try{
      const { q } = req.query;
      const products = await Categorie.find({ product_cat: q });
      return res.status(200).send(products);
    } catch(error) {
      next(error);
    }
}

// @Des: Get all categories
// @Method: GET
// @Access: Public
export const getCategorie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Categorie.find()
      .then((data) => res.status(200).send(data))
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};
