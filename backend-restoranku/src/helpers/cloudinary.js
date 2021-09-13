const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = (req, res, next) => {
  const pathFIle = req.file.path;
  console.log("path file:", pathFIle);
  const uniqueName = new Date().toISOString();

  cloudinary.uploader.upload(
    pathFIle,
    {
      resource_type: "raw",
      public_id: `restoranku-cloudinary-${uniqueName}`,
      tags: "restoranku-cloudinary",
    },
    (err, image) => {
      if (err) return res.status(500).send(err);
      console.log("file uploaded to cloudinary");

      fs.unlinkSync(pathFIle);
      req.image = image;
      console.log(req.image);
      next();
    }
  );
};

module.exports = uploadCloudinary;
