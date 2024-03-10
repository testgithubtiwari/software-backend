const cloudinary = require('cloudinary').v2;
const fs=require('fs');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});


const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) throw new Error('No localfile path is Provided');

        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        console.log("File is uploaded on cloudinary");
        console.log(response.url);

        return response;

    }catch(error){
        
        fs.unlinkSync(localFilePath);
        return null; 
    }
}

module.exports=uploadOnCloudinary