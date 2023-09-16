import { React, useState, useRef } from "react";
import { Box, Button, Input, Text } from '@chakra-ui/react';
import useMutation from '../hooks/useMutation.js'
import useQuery from "../hooks/useQuery.js";
import { useGetSchoolID } from "../hooks/useGetSchoolID.js";

const validFiles = ['image/jpeg', 'image/jpg', 'image/png'];


export const UploadImage = ({}) => {

    const schoolId = useGetSchoolID();
    const URL = `http://127.0.0.1:3001/school/images/${schoolId}`;

    const inputRef = useRef();
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const {
        mutate:uploadImage, 
        isLoading:uploading, 
        error:uploadError,
    } = useMutation({ url:URL });

    const {
        data: imageUrls=[], 
        isLoading: imagesLoading, error:fetchError
    } = useQuery(URL);

    const handleUpload = async (e) => {
        console.log(e);
        const file = e.target.files[0];
        console.log(file);

        if (!validFiles.find(type => type === file.type)) {
            setError("File must be in .jpg or .png format.");
            console.log("error");
            return;
        }

        const form = new FormData();
        form.append('image', file);

        await uploadImage(form);

    };

    return (
        <Box class='ml-10'>
            <Input id='imageInput' type='file' hidden onChange={handleUpload}/>
          <Button class='bg-blue-500 text-white px-4 py-2 rounded' as='label' htmlFor='imageInput' cursor='pointer' isLoading={uploading}>
                Upload Image
            </Button>
            {error & (<Text fontSize="lg">
                {error}
            </Text>)} 
        </Box>
    );

};