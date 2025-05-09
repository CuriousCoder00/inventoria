"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (image: string) => {
    try {
        const result = await cloudinary.uploader.upload(image, {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        });
        return {success: true, url: result.secure_url};
    } catch (error) {
        throw new Error('Error uploading image to Cloudinary');
    }
}