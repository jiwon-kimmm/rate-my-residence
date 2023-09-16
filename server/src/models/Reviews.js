import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    school: { type: String, required: true },
    residence: { type: String, required: true },
    room_type: {type: String, required: true},
    review_text: {type: String, required: true},
    rating: {type: Number, required: true},
    // userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
});

export const ReviewModel = mongoose.model("reviews", ReviewSchema);