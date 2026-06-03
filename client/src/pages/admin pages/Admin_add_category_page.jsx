import React, { useEffect, useState } from "react";
import "../../../public/css/Admin css/admin_addProduct.css";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import toast from "react-hot-toast";
import axios from "axios";
import { Details_components } from "./reuse components/Details_key_value_pair";
import { BasicTableOne } from "./reuse components/Add-category";
import { categories_by_brands } from "../../components/Header";


export const Admin_addCategory = () => {
  const [stock, setStock] = useState(1);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // select category
  const [selectCategory, setSelectCategory] = useState(null);
  //category modal open
  const [iscategorymodalOpen, setIscategorymodalOpen] = useState(true);

  //file upload
  const [fileName, setFileName] = useState("No file chosen");
  const [image, setImage] = useState(null);

  const [details, setDetails] = useState([
    { key: "", value: "" }
  ]);

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async () => {
    const res = await axios.get('http://localhost:3000/admin/api/get/categories');
    // setOptions(res.data.categories);
    setCategory(res.data.getcategoryName)
    console.log(res.data.getcategoryName);
  };

  const handleAdd = async (e) => {
    e.preventDefault()

    setLoading(true)

    const category_name = e.target.category_name.value

    const toastloading = toast.loading("Adding...")
    try {
      const res = await axios.post("http://localhost:3000/admin/api/add/categories", { category_name })

      const { message, type } = res.data
      toast[type](message, {
        id: toastloading
      })

      if (res.data.success) {
        getCategories()
      setSelected('')
      }

      setLoading(false)

    } catch (err) {
      console.log("Add Category Frontend Error:", err);
      toast.error("Frontend Add Category Error")
    }
  }


  const handleFileChange = () => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  // category more details
  const handlecategorySubmit = async (e) => {
    e.preventDefault()

    setSubmit(true)

    const formData = new FormData()

    formData.append("id", selectCategory.id)

    if (image) {
      formData.append("image", image)
    }

    formData.append('detail', e.target.category_detail.value)

    // const detailsObject = {}
    // details.forEach((item) => {
    //   if (item.key.trim() && item.value.trim()) {
    //     detailsObject[item.key] = item.value
    //   }
    // })

    // formData.append('details', JSON.stringify(detailsObject))

    const toastloading = toast.loading("Saving...")

    try {
      const res = await axios.post("http://localhost:3000/admin/api/imageupload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const { message, type } = res.data
      toast[type](message, {
        id: toastloading
      })

      console.log("response data form category form:", res.data);
      setSubmit(false)
      e.target.reset()
      setIscategorymodalOpen(false)
      getCategories()

    } catch (err) {
      console.log("Catgory Image and details Error:", err);
      console.error(err);
      toast.error(message)
    }
  }


  return (
    <>
      <div className="add-product-page">
        {/* HEADER */}
        <div className="page-top">
          <div>
            <h2 className="page-title">Add Category</h2>
          </div>

          <div className="breadcrumb">
            {/* <PageBreadCrumb pagetitle={"Add Product"}/> */}
            <span>Home</span>
            <span>›</span>
            <span>Add Category</span>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION */}
        <div className="product-card">
          <div className="card-header">
            <h3>Category Description</h3>
          </div>

          <div className="card-body">
            <div className="form-grid two-column">
              <div className="form-group">
                <label>Category Name</label>
                <form onSubmit={handleAdd} >
                  <div className="form-flex" style={{ display: 'flex', gap: '15px', marginBottom: '8px' }}>
                    {/* <input type="text" placeholder="Enter product name" /> */}
                    <input type="text" placeholder="Enter category Name" name="category_name" value={selected} onChange={(e) => setSelected(e.target.value)} style={{ width: '350px', letterSpacing: '1.1px' }} />
                    <button type="submit" disabled={!selected} style={{ marginTop: '4px', width: '60px', height: '40px', borderRadius: '20px', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Adding..' : 'Add'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="product-card">
          <div className="card-header">
            <table className="custom-table">
              <colgroup>
                <col style={{ width: '1%' }} />
                <col style={{ width: '4%' }} />
                <col style={{ width: '3%' }} />
                <col style={{ width: '4%' }} />
                <col style={{ width: '3%' }} />
              </colgroup>
              <thead className="card-header">
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Image</th>
                  <th>Category Description</th>
                  <th>More Details</th>
                </tr>
              </thead>

              <tbody>
                {category.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <h4>{category.name}</h4>
                      </div>
                    </td>

                    <td className="image-box-width">
                      <div style={{ width: '60%' }}>
                        {category.image && category.image.length === 1 ? (
                          <>
                            {category.image.map((img, index) => (
                              <div className="img-wrapper" key={index} style={{ position: 'relative' }}>
                                <img src={img} alt="portfolio" loading="lazy" decoding="async" style={{ width: 150, height: 150, objectFit: "cover" }} />

                                {/* delete Button */}
                                <button type="button" className="delete-image-btn">x</button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <span>No Images</span>
                        )}
                      </div>
                    </td>

                    <td>
                      {category.details && category.details.length > 0 ? (
                        category.details
                      ) : (
                        <span> No Details</span>
                      )}
                    </td>
                    {/* <td>{category.details && Object.keys(category.details).length > 0 ? (
                      <>
                        {Object.entries(category.details).map(([key, value], index) => (
                          <div key={index}>
                            {index + 1}. <strong>{key}</strong> : {value}
                          </div>
                        ))}
                      </>
                    ) : (
                      <span> No Details</span>
                    )}
                    </td> */}

                    {/* Upload Button */}
                    <td>
                      <button className="upload-btn upload-btn-new" onClick={() => { setSelectCategory(category), setIscategorymodalOpen(true) }} style={{ height: '33px', borderRadius: '21px', width: 'stretch', cursor: 'pointer' }}> View More</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {iscategorymodalOpen && selectCategory && (
        <>
          <div className="modal-overlay" onClick={() => setIscategorymodalOpen(false)}>
            <div className="main-content" style={{ display: iscategorymodalOpen ? 'block' : 'none', width: '50%', padding: '25px', backgroundColor: '#939393', borderRadius: '25px' }} onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setIscategorymodalOpen(false)} type="button">×</button>

              <form onSubmit={handlecategorySubmit}>
                <h1 style={{ color: 'black' }}>Selected Category : {selectCategory.name}</h1>

                <div className="form-group">
                  <label style={{ color: 'black' }}> Category Name : </label>
                  <input type="text" disabled name="category_name" value={selectCategory.name} style={{ cursor: 'not-allowed', color: 'white', backgroundColor: '#333' }} />
                </div>

                {/* Image Upload */}
                <label className="upload-label">Upload Image : </label>
                <div className="file-upload-card ">
                  <div className="card-body card-body1">
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        id="fileUpload"
                        className="file-input"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: 'black' }}> Category Detail : </label>
                  <input type="text" name="category_detail" placeholder="Enter Category Detail" style={{ backgroundColor: '#f8fafcb5', color: '#1e293b' }} />
                </div>

                {/* Add More Details */}
                {/* <Details_components details={details} setDetails={setDetails} /> */}

                <div style={{ textAlign: 'center' }}>
                  <button className='submit-button' type="submit">{submit ? "Saving..." : 'Submit'}</button>
                </div>
              </form>

            </div>
          </div>
        </>
      )}



    </>
  );
}