import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { SchoolModel } from "../models/School.js";
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from "../../s3.mjs";

const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage });

router.post('/images', upload.single("image"), async (req, res) => {
    const { file } = req;
    const userId = req.headers["x-user-id"];

    if (!file || !userId) {
        return res.status(400).json({ message: "Bad request." });
    }

    const {error, key} = await uploadToS3({file, userId});

    if (error) return res.status(500).json({ message: error.message });

    console.log("key: " + key);

    try {
        const result = await SchoolModel.findByIdAndUpdate({_id: "64fdd01a2e35ec424934eb0a"
        }, {
            $set : {
                image: `https://universityphotos.s3.amazonaws.com/${key}`
            }
        });

    } catch (err) {
        res.json(err);
    }

    return res.status(201).json({ key });
});

router.post('/images/:schoolId', upload.single("image"), async (req, res) => {
    const { file } = req;
    const userId = req.headers["x-user-id"];
    const { schoolId } = req.params;

    if (!file || !userId) {
        return res.status(400).json({ message: "Bad request." });
    }

    const {error, key} = await uploadToS3({file, userId});

    if (error) return res.status(500).json({ message: error.message });

    console.log("key: " + key);

    try {
        const result = await SchoolModel.findByIdAndUpdate({_id: schoolId
        }, {
            $set : {
                image: `https://universityphotos.s3.amazonaws.com/${key}`
            }
        });
        
    } catch (err) {
        res.json(err);
    }

    return res.status(201).json({ key });
});


router.get("/", async (req, res) => {
    try {
        const response = await SchoolModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const school = new SchoolModel(req.body);
    
    try {
        const response = await school.save();
        res.json(school);
        console.log("req.body", req.body);
    } catch (err) {
        res.json(err);
    }
});


export { router as schoolRouter };