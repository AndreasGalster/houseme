var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: Meteor.settings.cloudinary.cloud_name,
  api_key: Meteor.settings.cloudinary.api_key,
  api_secret: Meteor.settings.cloudinary.api_secret
});

const cloudinaryUploadSync = Meteor.wrapAsync(cloudinary.v2.uploader.upload);
Meteor.methods({
  imageUpload: function (imageFile) {

    // const result = cloudinaryUploadSync('https://www.houseme.space/img/hero_image.jpg',{
    const result = cloudinaryUploadSync(imageFile,{
        crop: 'limit', width: 400, height: 400, tags: ['profileImages'], folder: 'profileImages',
    });
    return result.public_id;
  },
  imageRemove: function (public_id) {
    cloudinary.v2.uploader.destroy(public_id, (err, res) => {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('image successfully removed');
      }
    });
  }
});



// Meteor.methods({
//   imageUpload: function (imageFile) {
//     const imageUpload = cloudinary.v2.uploader.upload('https://www.houseme.space/img/hero_image.jpg',{
//       crop: 'limit', width: 400, height: 400, tags: ['profileImages'], folder: 'profileImages',
//     }, (res) => {
//       return res.public_id;
//     });
//
//     return imageUpload;
//   }
// });
