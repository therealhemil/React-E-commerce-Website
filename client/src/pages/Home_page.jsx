import React from 'react'
import Header, { categories_by_brands, categories_List } from '../components/Header'
import "../../public/css/style.css"
import { Link } from 'react-router-dom'

function Home_page() {
    return (
        <>
            <Header />

            <section className="shop-category">
                <h2>Shop by category</h2>

                <div className="category-grid">
                    {categories_List.map((item, index) => (
                        <div className="category-card" key={index}>
                            <div className="category-image">
                                <Link to={item.Link}>
                                    <img src="/public/images/categories img/Desktops.jpg" alt="" />
                                </Link>
                            </div>
                            <Link to={item.Link} style={{ textDecoration: 'none' }}>
                                <h3>{item.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </section >


            <section className="shop-category">
                <h2>Shop by brands</h2>

                <div className="category-grid">
                    {categories_by_brands.map((item, index) => (
                        <div className="category-card" key={index}>
                            <div className="category-images">
                                <Link to={item.brandLink} >
                                    <img src="/public/images/categories by brands/apple logo.png" alt="" />
                                </Link>
                            </div>
                            <Link to={item.brandLink} style={{ textDecoration: 'none' }}>
                                <h3>{item.brandName}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </section >




        </>
    )
}

export { Home_page }