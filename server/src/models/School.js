import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
    school: { type: String, required: true, unique: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    image: { type: String }
});

export const SchoolModel = mongoose.model("schools", SchoolSchema);