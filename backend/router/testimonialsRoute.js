import {getTransformations} from "../controller/testimonialsController.js"
import express from "express";

const router = express.Router();

router.get("/transformations", getTransformations);    

export default router;