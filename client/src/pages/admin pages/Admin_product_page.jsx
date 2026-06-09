import React, { useEffect, useRef, useState } from "react";
import "../../../public/css/Admin css/admin_addProduct.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Details_components } from "./reuse components/Details_key_value_pair";
import { NewAddProductColors, ProductColors } from "./reuse components/Product_color";

function Admin_product_page() {

    const [loading, setLoading] = useState(false)
    const [allproducts, setAllproducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [openMoreMenu, setOpenMoreMenu] = useState(null);

    //Add New color
    const [colors, setColors] = useState([]);

    // add specification
    const [productSpecification, setProductSpecification] = useState([]);

    //view more option
    const [isViewmoreModalOpen, setIsViewmoreModalOpen] = useState(false);

    //select brand
    const [selectproduct, setSelectproduct] = useState(null);

    //edit product
    const [isEditing, setIsEditing] = useState(false);

    //edit color only
    const [editcolorIndex, setEditcolorIndex] = useState(null);

    //edit specification only
    const [editspecificationIndex, setEditspecificationIndex] = useState(null);

    //set details
    const [details, setDetails] = useState([]);

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null)

    const PreviewProductImages = [...(selectproduct?.product_images || []), ...images]

    console.log("Details:", details);
    console.log('Product Specification:', productSpecification);


    useEffect(() => {
        getproducts()
        getcatgoryNameOnly()
        getbrandDetail()
    }, []);

    const getproducts = async () => {
        const res = await axios.get('http://localhost:3000/admin/api/get/productDetail')
        setAllproducts(res.data.getallproducts)
        console.log("Get All Products:", res.data.getallproducts);
    }

    //get category name only
    const getcatgoryNameOnly = async () => {
        const res = await axios.get('http://localhost:3000/admin/api/get/categories/name');
        // setOptions(res.data.categories);
        setCategory(res.data.getcategoryNameOnly)
        // console.log(res.data.getcategoryNameOnly);
    };


    const getbrandDetail = async () => {
        const res = await axios.get('http://localhost:3000/admin/api/get/brandDetail');
        // setOptions(res.data.categories);
        console.log(res.data);
        setBrand(res.data.getbrandDetail)
        // setBrand(Object.values(res.data.brand_hash))
        console.log('Brand data', brand);

    };


    const handleDelete = async (uuid) => {
        const confirmDelete = window.confirm("Are you Sure you Want to Delete this Product?")

        if (!confirmDelete) return

        try {
            const res = await axios.delete(`http://localhost:3000/admin/api/delete/product/${uuid}`)

            toast.success(res.data.message)

            setAllproducts((prev) => prev.filter((product) => product.uuid !== uuid))

        } catch (err) {
            console.log('Delete Frontend Error: '.err);
            toast.error('Failed to Delete Product')
        }
    }


    const handleEditInout = (field) => (e) => {
        setSelectproduct((prev) => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const handleColorInput = (index, field) => (e) => {
        const updatedColors = [...colors];

        updatedColors[index] = {
            ...updatedColors[index],
            [field]: e.target.value
        };

        setColors(updatedColors)
        // setSelectproduct(prev => ({
        //     ...prev,
        //     product_color: updatedColors
        // }));
    };

    const handleSpecificationChange = (index, oldKey, type, newValue) => {
        const productSpecLength = selectproduct.product_specification?.length || 0;

        if (index < productSpecLength) {
            // Existing specification
            setSelectproduct(prev => {
                const updated = [...prev.product_specification];

                const oldValue = updated[index][oldKey];

                updated[index] =
                    type === "key"
                        ? { [newValue]: oldValue }
                        : { [oldKey]: newValue };
                return {
                    ...prev,
                    product_specification: updated,
                };
            });
        } else {
            // Newly added specification
            const detailsIndex = index - productSpecLength;

            setDetails(prev => {
                const updated = [...prev];

                const oldValue =
                    updated[detailsIndex][oldKey];

                updated[detailsIndex] =
                    type === "key"
                        ? { [newValue]: oldValue }
                        : { [oldKey]: newValue };

                return updated;
            });
        }
    };

    const removeImage = (index) => {
        const existingImages = selectproduct?.product_images || []
        const existingCount = existingImages.length

        if (index < existingCount) {
            const updatedExistingImages = [...existingImages]
            updatedExistingImages.splice(index, 1)
            setSelectproduct(prev => ({ ...prev, product_images: updatedExistingImages }))

        } else {

            const newImageIndex = index - existingCount;

            setImages(prev => prev.filter((_, i) => i !== newImageIndex));
        }
    }


    const handleViewMore = (product) => {
        setIsEditing(false)
        setSelectproduct(product);

        setColors(
            typeof product.product_color === "string"
                ? product.product_color.split(",")
                : product.product_color || []
        );

        setProductSpecification(
            typeof product.product_specification === "string"
                ? product.product_specification.split(",")
                : product.product_specification || []
        );

        setIsViewmoreModalOpen(true);
    };

    const handleColorDelete = (index) => {
        setColors(colors.filter((_, i) => i !== index));

        if (editcolorIndex === index) {
            setColorName("");
            setColorHex("#ffffff");
            setEditIndex(null);
        }
    };

    const handleImagechange = (e) => {
        const files = Array.from(e.target.files)

        const totalImages = PreviewProductImages.length + files.length

        if (totalImages > 5) {
            toast.error('Maximum 5 Images allowed')
            return
        }
        setImages(prev => [...prev, ...files])
        e.target.value = ''
    }

    const handleSpecificationDelete = (index) => {
        const productSpecLength =
            selectproduct.product_specification?.length || 0;

        if (index < productSpecLength) {
            setSelectproduct(prev => ({
                ...prev,
                product_specification:
                    prev.product_specification.filter(
                        (_, i) => i !== index
                    ),
            }));
        } else {
            const detailsIndex = index - productSpecLength;

            setDetails(prev =>
                prev.filter((_, i) => i !== detailsIndex)
            );
        }
    };

    return (
        <>
            <div className="add-product-page" style={{ padding: '24px 5px' }}>
                {/* HEADER */}
                <div className="page-top">
                    <div>
                        <h2 className="page-title">Products</h2>
                    </div>

                    <div className="breadcrumb">
                        {/* <PageBreadCrumb pagetitle={"Add Product"}/> */}
                        <span>Home</span>
                        <span>›</span>
                        <span>Products</span>
                    </div>
                </div>


                {/* PRODUCT DESCRIPTION */}
                <div className="product-card-box">
                    <div className="card-header">
                        <h3>Products List</h3>
                    </div>

                    <div className="card-body" onClick={() => setOpenMoreMenu(null)}>

                        {/* <div className="product-card"> */}
                        {/* <div className="card-header"> */}
                        <table className="custom-table">
                            {/* <colgroup>
                                <col style={{ width: '1%' }} />
                                <col style={{ width: '4%' }} />
                                <col style={{ width: '3%' }} />
                                <col style={{ width: '4%' }} />
                                <col style={{ width: '3%' }} />
                            </colgroup> */}
                            <thead className="card-header">
                                <tr>
                                    <th>ID</th>
                                    <th>Products</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>MRP</th>
                                    <th>Offer Price</th>
                                    <th>Total Stock</th>
                                    <th>Available Stock</th>
                                    <th>Product Specidfication</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allproducts?.map((products, index) => {


                                    const categoryData = category.find(
                                        cat => cat.uuid === products.category_uuid
                                    )

                                    const brandData = brand.find(
                                        brand => brand.uuid === products.brand_uuid
                                    )

                                    // const brandData = brand.find(item => item.brand_uuid === selectproduct.brand_uuid)
                                    // const filteredBrands = brand.filter(
                                    //     item =>
                                    //         item.category_uuid ===
                                    //         selectproduct.category_uuid
                                    // );

                                    return (

                                        <tr key={index}>
                                            <td>{index + 1}</td>

                                            <td style={{ padding: '16px 0', width: '18%' }}>
                                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                    <img style={{ width: '50px', height: '40px' }} src={products.product_images?.[0] || '/no-images.png'} alt={'No Image'} />
                                                    <h4>{products.name}</h4>
                                                </div>
                                            </td>

                                            <td>
                                                <div>
                                                    <h4>{categoryData?.name || 'No Category'}</h4>
                                                    {/* <select value={selectproduct.category_uuid || ""} disabled={!isEditing} onChange={(e) => setSelectproduct(prev => ({ ...prev, category_uuid: e.target.value, brand_uuid: '' }))}>
                                                        {category.map((cat) => {
                                                            <option key={cat.uuid} value={cat.uuid}>{cat.name}</option>
                                                        })}
                                                    </select> */}
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <h4>{brandData?.name || 'No Brand'}</h4>
                                                    {/* <select value={selectproduct.brand_uuid || ""} disabled={!isEditing} onChange={(e) => setSelectproduct(prev => ({ ...prev, brand_uuid: e.target.value}))}>
                                                        {filteredBrands.map((item) => {
                                                            <option key={item.brand_uuid} value={item.brand_uuid}>{item.brand_name}</option>
                                                        })}
                                                    </select> */}
                                                </div>
                                            </td>

                                            <td>
                                                <div>
                                                    <h4>{products.product_mrp}</h4>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <h4>{products.product_offer_price}</h4>
                                                </div>
                                            </td>

                                            <td>
                                                <div>
                                                    <h4>{products.product_quantity}</h4>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <h4>{products.product_available_quantity}</h4>
                                                </div>
                                            </td>

                                            <td>{products.product_specification && products.product_specification?.length > 0 ? (
                                                <>
                                                    {products.product_specification.map((spec, index) => (
                                                        <div key={index}>
                                                            {Object.entries(spec).map(([key, value]) => (
                                                                <div key={key}>

                                                                    <strong>{key}</strong> : {value}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <span> No Details</span>
                                            )}
                                            </td>

                                            <td>
                                                <div>
                                                    <h4>{new Date(products.createdAt).toLocaleDateString('en-GB')}</h4>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="action-menu">
                                                    <div>

                                                        <button
                                                            className="menu-btn"
                                                            onClick={(e) => { e.stopPropagation(), setOpenMoreMenu(openMoreMenu === index ? null : index) }}
                                                        >
                                                            •••
                                                        </button>
                                                    </div>
                                                    {openMoreMenu === index && (
                                                        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                                            <button className="dropdown-item" onClick={() => handleViewMore(products)}>
                                                                View More
                                                            </button>

                                                            <button className="dropdown-item delete" onClick={() => handleDelete(products.uuid)}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>



                {/* </div> */}
            </div>
            {/* </div > */}



            {isViewmoreModalOpen && selectproduct && (() => {

                // const categoryData = brand[category]
                // console.log("Categorydata", categoryData.category_name);

                const categoryData = category.find(
                    cat => cat.uuid === selectproduct.category_uuid
                )


                const brandData = brand.find(
                    brand => brand.uuid === selectproduct.brand_uuid
                )



                const productSpecification =
                    typeof selectproduct.product_specification === 'string'
                        ? selectproduct.product_specification.split(",")
                        : selectproduct.product_specification || []

                const allSpecifications = [...productSpecification, ...details]

                console.log('All the SPecification together', allSpecifications);


                // Update product 
                const handleUpdateProduct = async (e) => {
                    e.preventDefault()

                    // const allSpecifications = [...productSpecification, ...details]

                    console.log('All Specification to send in form', allSpecifications);


                    setLoading(true)

                    const formData = new FormData()

                    formData.append("product_uuid", selectproduct.uuid)
                    formData.append('product_name', selectproduct.name)
                    console.log('product_name', selectproduct.name);

                    formData.append('product_color', JSON.stringify(colors))
                    formData.append("product_size", selectproduct.product_size)
                    formData.append("product_weight", selectproduct.product_weight)
                    formData.append("product_length", selectproduct.product_length)
                    formData.append("product_width", selectproduct.product_width)
                    formData.append("product_specification", JSON.stringify(allSpecifications))
                    formData.append("product_mrp", selectproduct.product_mrp)
                    formData.append("product_offer_price", selectproduct.product_offer_price)
                    formData.append("product_quantity", selectproduct.product_quantity)
                    formData.append("product_available_quantity", selectproduct.product_available_quantity)

                    //existing Images
                    formData.append('existing_images', JSON.stringify(selectproduct.product_images || []))

                    //new images
                    images.forEach((file) => { formData.append('images', file) })

                    const toastloading = toast.loading("Updating...")
                    try {
                        const res = await axios.put('http://localhost:3000/admin/api/update/product', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })

                        const { message, type } = res.data

                        toast[type](message, {
                            id: toastloading
                        })

                        setLoading(false)
                        setIsViewmoreModalOpen(false)
                        getproducts()

                    } catch (err) {
                        console.log("Product Update Error:", err);
                    }

                }


                return (
                    <>
                        <div className="modal-overlay" onClick={() => setIsViewmoreModalOpen(false)}>
                            <div className="main-content details-container" style={{ display: isViewmoreModalOpen ? 'block' : 'none', width: '90%', padding: '25px', background: '#111c33;', borderRadius: '25px', maxHeight: '95%', overflowY: 'auto', overflowX: 'hidden' }} onClick={(e) => e.stopPropagation()}>
                                <button className="close-btn" onClick={() => { setIsViewmoreModalOpen(false), setDetails([]), setSelectproduct(null), setOpenMoreMenu(false) }} type="button">×</button>

                                <form onSubmit={handleUpdateProduct}>
                                    <div className="" style={{ color: 'white' }}>

                                        {/* PRODUCT DESCRIPTION */}
                                        <div className="product-card">
                                            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h3>Products Description</h3>
                                                <button type="button" className="form-edit-button" onClick={() => setIsEditing(!isEditing)}> {isEditing ? 'Disable Edit' : 'Edit Button'}</button>
                                            </div>

                                            <div className="card-body">
                                                <div className="form-grid two-column">
                                                    <div className="form-group">
                                                        <label>Product Name</label>
                                                        <input type='text' value={selectproduct.name} onChange={handleEditInout('name')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>category</label>
                                                        <input type="text" value={categoryData?.name || ""} disabled={!isEditing} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Brand</label>
                                                        <input type="text" value={brandData?.name || ""} disabled={!isEditing} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Product Color</label>

                                                        {/* <ProductColors color={colors} setColor={setColors} style={{ marginTop: '0' }} /> */}
                                                        <NewAddProductColors color={colors} setColor={setColors} style={{ marginTop: '0' }} />

                                                        {colors && colors.length > 0 ? (
                                                            <>
                                                                <div className="details-container" style={{ display: 'grid', overflowY: 'auto', maxHeight: '100px', gap: '5px' }}>
                                                                    {colors?.map((item, index) => (
                                                                        <>
                                                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} key={index}>

                                                                                <span>{index + 1}</span>

                                                                                <div style={{ width: '60%' }}>
                                                                                    <input type="text" value={item.color_name} disabled={editcolorIndex !== index} onChange={handleColorInput(index, 'color_name')} style={{ flex: 1, width: '100%', background: editcolorIndex === index ? "white" : 'black', cursor: editcolorIndex === index ? 'text' : 'not-allowed', color: editcolorIndex === index ? 'black' : 'white' }} />
                                                                                </div>

                                                                                <div className="color-picker-container">
                                                                                    <input type="color" defaultValue={item.color_hex} onBlur={(e) => { handleColorInput(index, 'color_hex')(e) }} className="color-picker" disabled={editcolorIndex !== index} style={{ cursor: editcolorIndex === index ? 'pointer' : 'not-allowed', }} />
                                                                                </div>

                                                                                <div style={{ display: 'flex', gap: '5px' }}>

                                                                                    <button type="button" className="color-add-button" onClick={() => setEditcolorIndex(editcolorIndex === index ? null : index)}>
                                                                                        {editcolorIndex === index ? 'Update' : 'Edit'}
                                                                                    </button>
                                                                                    <button type="button" className="color-add-button delete-button" onClick={() => handleColorDelete(index)}>Delete </button>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>

                                                            </>
                                                        )}


                                                    </div>
                                                </div>

                                                <div className="form-grid two-column">
                                                    <div className="form-group">
                                                        <label>Size</label>
                                                        <input type='text' value={selectproduct.product_size} onChange={handleEditInout('product_size')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>


                                                    <div className="form-grid three-column">
                                                        <div className="form-group">
                                                            <label>Weight (kg)</label>
                                                            <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_weight} onChange={handleEditInout('product_weight')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Length (cm)</label>
                                                            <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_length} onChange={handleEditInout('product_length')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Width (cm)</label>
                                                            <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_width} onChange={handleEditInout('product_width')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-header" style={{ padding: '10px 0' }}>
                                                    <div className="form-grid">
                                                        <h3>Product Specification</h3>
                                                    </div>
                                                </div>

                                                <Details_components details={details} setDetails={setDetails} />

                                                {allSpecifications && allSpecifications?.length > 0 ? (
                                                    <>
                                                        <div className="form-grid details-container" style={{ marginTop: '15px' }}>
                                                            {allSpecifications?.map((item, index) => (
                                                                <>
                                                                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexDirection: 'column' }}>
                                                                        {Object.entries(item).map(([key, value], Entryindex) => (
                                                                            <>
                                                                                <div key={Entryindex} style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>

                                                                                    <h3>{index + 1}</h3>
                                                                                    <input type="text" value={key} disabled={editspecificationIndex !== index} onChange={(e) => handleSpecificationChange(index, key, 'key', e.target.value)} style={{ flex: 1, width: '100%', background: editspecificationIndex === index ? "white" : 'black', cursor: editspecificationIndex === index ? 'text' : 'not-allowed', color: editspecificationIndex === index ? 'black' : 'white', padding: '0 16px', height: '50px', fontSize: '1.1rem', borderRadius: '10px', outline: 'none', border: 'none' }} />
                                                                                    <input type="text" value={value} disabled={editspecificationIndex !== index} onChange={(e) => handleSpecificationChange(index, key, 'value', e.target.value)} style={{ flex: 1, width: '100%', background: editspecificationIndex === index ? "white" : 'black', cursor: editspecificationIndex === index ? 'text' : 'not-allowed', color: editspecificationIndex === index ? 'black' : 'white', padding: '0 16px', height: '50px', fontSize: '1.1rem', borderRadius: '10px', outline: 'none', border: 'none' }} />
                                                                                    <button type="button" className="color-add-button" onClick={() => setEditspecificationIndex(editspecificationIndex === index ? null : index)}>
                                                                                        {editspecificationIndex === index ? 'Update' : 'Edit'}
                                                                                    </button>
                                                                                    <button type="button" className="color-add-button delete-button" onClick={() => handleSpecificationDelete(index, key)}>
                                                                                        Delete
                                                                                    </button>
                                                                                </div>

                                                                            </>
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* <Details_components details={details} setDetails={setDetails} /> */}
                                                    </>
                                                )}



                                                <div className="card-header" style={{ padding: '10px 0' }}>
                                                    <div className="form-grid">
                                                        <h3>Pricing & Availability</h3>
                                                    </div>
                                                </div>

                                                <div className="form-grid two-column">
                                                    <div className="form-group">
                                                        <label>Product MRP (Rs.)</label>
                                                        <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_mrp} onChange={handleEditInout('product_mrp')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Product Offer Price (Rs.)</label>
                                                        <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_offer_price} onChange={handleEditInout('product_offer_price')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                    </div>

                                                </div>

                                                <div className="form-grid two-column">
                                                    <div className="form-group">
                                                        <label>Stock Quantity</label>

                                                        <div className="quantity-box">
                                                            <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_quantity} onChange={handleEditInout('product_quantity')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Available Stock Quantity</label>
                                                        <div className="quantity-box">
                                                            <input type="number" onWheel={(e) => e.target.blur()} value={selectproduct.product_available_quantity} onChange={handleEditInout('product_available_quantity')} disabled={!isEditing} className={isEditing ? 'editable-text' : 'readonly-text'} style={{ background: isEditing ? "white" : 'black', cursor: isEditing ? 'text' : 'not-allowed', color: isEditing ? 'black' : 'white' }} />
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="card-header" style={{ padding: '10px 0' }}>
                                                    <h3>Products Images</h3>
                                                </div>

                                                <div className="card-body">

                                                    <div className="upload-box">
                                                        {PreviewProductImages && PreviewProductImages.length >= 5 ? (
                                                            <p>Max 5 Image Upload </p>
                                                        ) : (
                                                            <>
                                                                <div className="upload-icon">⬆</div>
                                                                <p>
                                                                    <strong>Click to upload</strong> or drag and
                                                                    drop SVG, PNG, JPG or GIF
                                                                </p>
                                                                <span>(MAX. 800x400px)</span><br />
                                                                <span>(Maximum 5 Images)</span>
                                                            </>
                                                        )}
                                                        <input ref={fileInputRef} onChange={handleImagechange} type="file" multiple name="images" disabled={PreviewProductImages.length >= 5} />
                                                    </div>

                                                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "15px" }} >

                                                        {PreviewProductImages && PreviewProductImages.length > 0 ? (
                                                            <>
                                                                {PreviewProductImages.map((item, index) => (

                                                                    <div key={index} className="preview-box" style={{ position: 'relative' }}>
                                                                        <button type="button" className="remove-image-button" style={{ right: '8px' }} onClick={() => removeImage(index)}>X</button>
                                                                        <img src={typeof item === 'string' ? item : URL.createObjectURL(item)} alt={`preview-${index}`}
                                                                            style={{
                                                                                width: "120px",
                                                                                height: "120px",
                                                                                objectFit: "cover",
                                                                                borderRadius: "10px",
                                                                                border: "1px solid #ddd",
                                                                            }} />
                                                                    </div>
                                                                ))}
                                                            </>
                                                        ) : (<>
                                                            <span>No Images</span>
                                                        </>)}
                                                    </div>
                                                </div>

                                                {/* Update Product button */}
                                                <div style={{ textAlign: 'center' }}>
                                                    <button type='submit' className="publish-btn">
                                                        {loading ? 'Updating' : 'Update Product'}
                                                    </button>
                                                </div>
                                            </div >
                                        </div>
                                    </div >



                                </form>

                            </div >
                        </div >
                    </>
                )
            })()}


        </>
    )
}


export default Admin_product_page
