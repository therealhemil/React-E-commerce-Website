import { categoriesQuery } from "../models/categories_model.js";




export const filesSaveAsJson = async (name, files) => {
    console.log("Files before maping to cloudfront url :", name, files);

    const fileUrls = generateFileUrl(files)
    console.log("File uploaded Urls: ", fileUrls);

    await categoriesQuery.findOne({ where: { name: name } }).then((async data => {
        console.log("Data", data, data.title);
        var category_image = data;

        console.log("Category Image", category_image);

        let newFileUrls = [];

        if (category_image && category_image.images && category_image.images.length) {
            newFileUrls = category_image.images;
            fileUrls.forEach(url => newFileUrls.push(url));
        } else {
            newFileUrls = fileUrls;
        }

        let inserted = await category_image.update(
            { images: newFileUrls },
            { where: { name: name } }
        )

        return inserted;
    }))


}