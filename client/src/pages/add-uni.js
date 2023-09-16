import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SchoolImage from "../components/SchoolImage.js"
import { ChakraProvider, Box } from '@chakra-ui/react';

export const AddUni = () => {

    const [newuni, setNewuni] = useState({
        school: "",
        image: "",
    });
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState();

    const handleAddSchoolChange = (event) => {
        const { name, value } = event.target;
        setNewuni({ ...newuni, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/school", { ...newuni });
            alert("School added");
        } catch (err) {
            console.error(err);
        }
    };

    const imageUpload = () => {
        console.log("uploading image");
    }

    return (
        <ChakraProvider>
            <Box>
                <div className="add-wrapper" class="m-6 ml-11 p-5">
                    <h1 class="text-3xl text-gray-700 mb-5">Don't see your university or college?</h1>
                    <h2 class="text-xl text-gray-700 mb-5">Add your school below.</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" class="mb-5">
                            <input
                                type="text"
                                id="newuni"
                                name="school"
                                value={newuni.school}
                                placeholder="Add your university..."
                                class="px-3 py-2 text-black rounded-2xl ring-2 ring-gray-300"
                                onChange={handleAddSchoolChange}
                            />
                        </div>
                        <SchoolImage />
                        <Button type="submit" class="border rounded px-3 py-2 bg-green-600 text-white font-dmsans border-none"> Add University </Button>
                    </form>
                </div>
            </Box>
        </ChakraProvider>
    );
};