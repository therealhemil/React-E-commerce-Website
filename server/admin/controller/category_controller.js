import { where } from "sequelize"
import { categoriesQuery } from "../../models/relations_model.js"
import { filesSaveAsJson } from "../../services/upload_images.js"
import { upload } from "../../config/multerS3Config.js"


export const categoriesnameAdd = async (req, res) => {
  const { category_name } = req.body

  try {
    const addcategory = await categoriesQuery.findOne({ where: { name: category_name } })

    if (addcategory) {
      return res.json({
        message: "Category Already in list",
        type: "error"
      })
    } else {
      await categoriesQuery.create({ name: category_name })
      return res.status(200).json({
        message: `${category_name}, Category Add`,
        type: 'success',
        success: true
      })
    }
  } catch (err) {
    console.log("Category Name adding Error : ", err);
    return res.status(500).json({
      message: "Server Error",
      type: 'error'
    })

  }
}


//get the new category name
export const getcategoriesName = async (req, res) => {
  try {
    const getcategoryName = await categoriesQuery.findAll({
      attributes: ['id', 'name', 'image', 'details'],
      order: [['id', 'ASC']]
    })

    return res.status(200).json({
      getcategoryName,
      success: true
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      success: false
    });
  }
}
//get category name only
export const getcategoriesNameOnly = async (req, res) => {
  try {
    const getcategoryNameOnly = await categoriesQuery.findAll({
      attributes: ['uuid','name'],
      order: [['id', 'ASC']]
    })

    return res.status(200).json({
      getcategoryNameOnly,
      success: true
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      success: false
    });
  }
}



//category image upload
// export const categoryImageUplaod = async (req, res) => {
//   const { name } = req.params
//   if (!name) {
//     return res.status(404).json({ message: "First Add Category", type: "error" });
//   }

//   try {
//     const files = req.files
//     console.log('Admin Uploaded Category Image:', req.files);

//     if (!files[0]) {
//       return res.status(400).json({
//         message: 'No Files Uploaded',
//         type: 'error'
//       })
//     }

//     const uploadingFiles = await filesSaveAsJson(name, files)

//     return res.status(200).json({
//       message: "Image Uploaded Successfully",
//       name: name,
//       files: uploadingFiles,
//       type: 'success'
//     })
//   } catch (err) {
//     console.log("category Image Upload Controller Error:", err);
//     return res.status(500).json({ messsge: "Image Uploading Error", type: 'error' })
//   }
// }


//category detail controller
// export const addCategoryDetails = async (req, res) => {
//   try {
//     const { name } = req.params;

//     const { details } = req.body;

//     const category = await categoriesQuery.findOne({
//       where: {
//         name,
//         isDeleted: false,
//       },
//     });

//     if (!category) {
//       return res.status(404).json({
//         message: "Category Not Found",
//         type: "error",
//       });
//     }

//     if (!details || typeof details !== "object") {
//       return res.status(400).json({
//         message: "Details Must Be Object",
//         type: "error",
//       });
//     }

//     const updatedDetails = {
//       ...(category.details || {}),
//       ...details,
//     };

//     await category.update({
//       details: updatedDetails,
//     });

//     return res.status(200).json({
//       message: "Details Added Successfully",
//       details: updatedDetails,
//       type: "success",
//     });
//   } catch (err) {
//     console.log(err);

//     return res.status(500).json({
//       message: "Internal Server Error",
//       type: "error",
//     });
//   }
// };\


const generateFileUrl = (files) => {
  return files.map(file => {
    return `https://${process.env.CLOUDFRONT_URL}/${file.key}`
  })
}


export const categoryImageAndDetailsUpload = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(404).json({
      message: "First Add Category",
      type: "error"
    });
  }

  try {

    const category = await categoriesQuery.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    });

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found",
        type: "error"
      });
    }

    // Details from frontend
    let detail = req.body.detail || "";

    console.log(req.body.detail);


    // if (req.body.details) {
    //   details =
    //     typeof req.body.details === "string"
    //       ? JSON.parse(req.body.details)
    //       : req.body.details;
    // }

    let uploadedImage = category.images || [];

    console.log("Uploaded image", req.files);

    // Upload Images
    if (req.files && req.files.length > 0) {

      console.log(
        "Admin Uploaded Category Image:",
        req.files
      );

      uploadedImage = generateFileUrl(req.files);
    }

    // Update Category
    await category.update({
      image: uploadedImage,
      details: detail
    });

    return res.status(200).json({
      message: "Category Updated Successfully",
      image: uploadedImage,
      details: detail,
      type: "success"
    });

  } catch (err) {

    console.log(
      "Category Upload Controller Error:",
      err
    );

    return res.status(500).json({
      message: "Internal Server Error",
      type: "error"
    });
  }
};
