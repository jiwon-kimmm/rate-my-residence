import express from "express";
import moongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import {
    getSchoolReviews,
    addReview
} from "../controllers/reviews.js";


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await ReviewModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const review = new ReviewModel(req.body);

    try {
        const response = await review.save();
        res.json(review);
    } catch (err) {
        res.json(err);
    }
});

router.get("/:id", getSchoolReviews); // get the schools reviews

// add a review
router.patch("/:id/:reviewId", addReview);


export { router as reviewsRouter };