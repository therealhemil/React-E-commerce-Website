import React, { useEffect, useState } from 'react'
import Header, { categories_by_brands, categories_List } from '../components/Header'
import "../../public/css/style.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

function Home_page() {

    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);

    useEffect(() => {
        // getcatgoryNameOnly()
        // getbrandDetail()
        getbrand_categoryDetails()
    }, []);

    //get category name only
    // const getcatgoryNameOnly = async () => {
    //     const res = await axios.get('http://localhost:3000/admin/api/get/categories/name');
    //     console.log("All category_list", res.data);
    //     setCategoryList(res.data.getcategoryNameOnly)

    // };


    // const getbrandDetail = async () => {
    //     const res = await axios.get('http://localhost:3000/admin/api/get/brandDetail');
    //     console.log('All brand name', res.data.getbrandDetail);
    //     setBrandList(res.data.getbrandDetail)

    //     // console.log(res.data.getbrandDetail);
    // };

    const getbrand_categoryDetails = async () => {
        const res = await axios.get('http://localhost:3000/admin/api/get/brand_and_catgeory');
        console.log('All brand name', res.data);
        setBrandList(res.data.unique_brand)
        setCategoryList(res.data.getcategoryNameOnly)

    }


    return (
        <>
            <Header categoryList={categoryList} brandList={brandList} />

            <section className="shop-category">
                <h2>Shop by category</h2>

                <div className="category-grid">
                    {categoryList.map((item, index) => (
                        <div className="category-card" key={index}>
                            <div className="category-image">
                                <Link to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <img src="/public/images/categories img/Desktops.jpg" alt="" />
                                </Link>
                            </div>
                            <Link to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                                <h3>{item.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </section >



            <section className="shop-category">
                <h2>Shop by brands</h2>

                <div className="category-grid">
                    {brandList.map((item, index) => (
                        <div className="category-card" key={index}>
                            <div className="category-images">
                                <Link to={`/brand/${item.name.toLowerCase().replace(/\s+/g, '-')}`} >
                                    <img src="/public/images/categories by brands/apple logo.png" alt="" />
                                </Link>
                            </div>
                            <Link to={`/brand/${item.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                                <h3>{item.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </section >




        </>
    )
}

export { Home_page }