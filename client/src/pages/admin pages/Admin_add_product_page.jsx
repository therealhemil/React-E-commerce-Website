import React, { useEffect, useState } from "react";
import "../../../public/css/Admin css/admin_addProduct.css";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import axios from "axios";
import { Details_components } from "./reuse components/Details_key_value_pair";
import toast from "react-hot-toast";


export const Admin_AddProduct = () => {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  //select category
  const [selectCategory, setSelectCategory] = useState('')

  //select brand
  const [selectbrand, setSelectbrand] = useState('');


  //set category name
  const [category, setCategory] = useState([]);

  //set category name
  const [brand, setBrand] = useState([]);

  const [details, setDetails] = useState([
    { key: "", value: "" }
  ]);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);



  useEffect(() => {
    getcatgoryNameOnly()
    getbrandDetail()
  }, []);

  //get category name only
  const getcatgoryNameOnly = async () => {
    const res = await axios.get('http://localhost:3000/admin/api/get/categories/name');
    // setOptions(res.data.categories);
    setCategory(res.data.getcategoryNameOnly)
    console.log(res.data.getcategoryNameOnly);
  };


  const getbrandDetail = async () => {
    const res = await axios.get('http://localhost:3000/admin/api/get/brandDetail');
    // setOptions(res.data.categories);
    setBrand(res.data.getbrandDetail)
    console.log(res.data.getbrandDetail);
  };


  //filter brand
  const filteredBrand = brand.filter((item)=> item.category_uuid === selectCategory)


  const handleAddProduct = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData()

    formData.append('product_name', e.target.product_name.value)
    formData.append('category_uuid', selectCategory)
    formData.append('brand_uuid', selectbrand)
    formData.append('product_color', e.target.product_color.value)
    formData.append('product_size', e.target.product_size.value)
    formData.append('product_weight', e.target.product_weight.value)
    formData.append('product_length', e.target.product_length.value)
    formData.append('product_width', e.target.product_width.value)
    formData.append('product_mrp', e.target.product_mrp.value)
    formData.append('product_offer_price', e.target.product_offer_price.value)
    formData.append('product_quantity', e.target.product_quantity.value)
    formData.append('product_available_quantity', e.target.product_available_quantity.value)

    const detailsObject = {}
    details.forEach((item) => {
      if (item.key.trim() && item.value.trim()) {
        detailsObject[item.key] = item.value
      }
    })

    formData.append('details', JSON.stringify(detailsObject))

    //images
    images.forEach((img) => {
      formData.append('images', img)
    })

    const toastloading = toast.loading("Publishing...")
    try {
      const res = await axios.post("http://localhost:3000/admin/api/add/product", formData)

      const { message, type } = res.data
      toast[type](message, {
        id: toastloading
      })

      console.log("Add Product Response", res.data);

      
      e.target.reset()
      setLoading(false)

    } catch (err) {

      console.log("Add Product Error:", err);

    }

  }


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };





  return (
    <div className="add-product-page">
      {/* HEADER */}
      <div className="page-top">
        <div>
          <h2 className="page-title">Add New Product</h2>
        </div>

        <div className="breadcrumb">
          {/* <PageBreadCrumb pagetitle={"Add Product"}/> */}
          <span>Home</span>
          <span>›</span>
          <span>Add Product</span>
        </div>
      </div>

      <form onSubmit={handleAddProduct}>
        {/* PRODUCT DESCRIPTION */}
        <div className="product-card">
          <div className="card-header">
            <h3>Products Description</h3>
          </div>

          <div className="card-body">
            <div className="form-grid two-column">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" name="product_name" placeholder="Enter Product Name" required />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category_uuid" value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  {category.map((category, index) => (
                    <option key={index} value={category.uuid}>{category.name}</option>
                  ))}
                </select>

              </div>
            </div>

            <div className="form-grid three-column">

              <div className="form-group">
                <label>Brand</label>
                <select name="brand_uuid" value={selectbrand} onChange={(e) => setSelectbrand(e.target.value)} required disabled={!selectCategory}>
                  <option value="">Select Brand</option>
                  {filteredBrand.map((brand, index)=> (
                    <option key={index} value={brand.uuid}>{brand.name}</option>
                  ))}
                  {/* {brand.map((brand, index) => (
                    <option key={index} value={brand.uuid}>{brand.name}</option>
                  ))} */}
                </select>
              </div>

              <div className="form-group">
                <label>Color</label>
                <input type="text" name="product_color" placeholder="Enter Product Color" />
              </div>

              <div className="form-group">
                <label>Size</label>
                <input type="text" name="product_size" placeholder="Enter Product Size" />
              </div>

            </div>


            <div className="form-grid three-column">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" name="product_weight" defaultValue="15" />
              </div>

              <div className="form-group">
                <label>Length (cm)</label>
                <input type="number" name="product_length" defaultValue="120" />
              </div>

              <div className="form-group">
                <label>Width (cm)</label>
                <input type="number" name="product_width" defaultValue="23" />
              </div>
            </div>
          </div>
        </div>

        <div className="product-card">
          <div className="card-header">

            <Details_components details={details} setDetails={setDetails} />

            {/* <div className="form-group">
            <label>Description</label>
            <textarea
              rows="6"
              name="product_description"
              placeholder="Receipt info (optional)"
            ></textarea>
          </div> */}
          </div>
        </div>

        {/* PRICING */}
        <div className="product-card">
          <div className="card-header">
            <h3>Pricing & Availability</h3>
          </div>

          <div className="card-body">
            <div className="form-grid two-column">
              <div className="form-group">
                <label>Product MRP (Rs.)</label>
                <input type="number" name="product_mrp" defaultValue="15" />
              </div>

              <div className="form-group">
                <label>Product Offer Price (Rs.)</label>
                <input type="number" name="product_offer_price" defaultValue="10" />
              </div>

              {/* <div className="form-group">
              <label>Tax (%)</label>
              <input type="number" defaultValue="23" />
              </div> */}
            </div>

            <div className="form-grid two-column">
              <div className="form-group">
                <label>Stock Quantity</label>

                <div className="quantity-box">
                  <input type="number" name="product_quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} defaultValue="10" />
                </div>
              </div>

              <div className="form-group">
                <label>Available Stock Quantity</label>
                <div className="quantity-box">
                  <input type="number" name="product_available_quantity" value={quantity} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="product-card">
          <div className="card-header">
            <h3>Products Images</h3>
          </div>

          <div className="card-body">

            <div className="upload-box">
              <div className="upload-icon">⬆</div>

              <p>
                <strong>Click to upload</strong> or drag and
                drop SVG, PNG, JPG or GIF
              </p>

              <span>(MAX. 800x400px)</span>

              <input type="file"
                multiple
                name="images"
                onChange={handleImageChange} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px"
              }}
            >
              hello
              {previewImages.map((img, index) => {
                <>
                  <span>{index + 1}</span>
                  <img src={img} alt={`preview-${img.name}`}
                    style={{
                      width: "120px",
                    height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #ddd"
                    }} />

                </>
              })}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="product-actions">
          {/* <button className="draft-btn">
            Draft
          </button> */}

          <button type='submit' className="publish-btn">
            {loading ? 'Publishing...' : 'Publish Product'}
          </button>
        </div>

      </form>
    </div >
  );
};














