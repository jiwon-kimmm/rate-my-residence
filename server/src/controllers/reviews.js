import { ReviewModel } from "../models/Reviews.js";
import { SchoolModel } from "../models/School.js";

export const getSchoolReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await SchoolModel.findById(id);

        const reviews = await Promise.all(
            school.reviews.map((id) => ReviewModel.findById(id))
        );

        const formattedReviews = reviews.map(
            ({ _id, school, residence, room_type, review_text, rating, userOwner }) => {
                return { _id, school, residence, room_type, review_text, rating, userOwner };
            }
        );
        res.status(200).json(formattedReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const school = await SchoolModel.findById(id); // grabbing school by school id
        const review = await ReviewModel.findById(reviewId); // could comment out?

        school.reviews.push(reviewId);
        await school.save();

        const reviews = await Promise.all(
            school.reviews.map((id) => ReviewModel.findById(id))
        );

        const formattedReviews = reviews.map(
            ({ _id, school, residence, room_type, review_text, rating, userOwner }) => {
                return { _id, school, residence, room_type, review_text, rating, userOwner };
            }
        );

        res.status(200).json(formattedReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
} 
