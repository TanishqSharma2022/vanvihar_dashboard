// require('dotenv').config()

import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// const ImageUpload = async(req, res) => {
//     const image = 'https://images.unsplash.com/photo-1534744971734-e1628d37ea01?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

//     await cloudinary.uploader.upload(image).then((result) => {
//         console.log(result)
//     })
// }
export async function POST(req, res) {
  if (req.method == "POST") {
    try {
      const data = await req.json();

      // Access imageUrl from the parsed data
      const { imageUrl } = data;
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl);

      console.log(cloudinaryResponse);

      return NextResponse.json({
        cloudinaryUrl: cloudinaryResponse.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return NextResponse.json({ error: "Internal Server Error" });
    }
  }
}
// pages/api/cloudinary.js
