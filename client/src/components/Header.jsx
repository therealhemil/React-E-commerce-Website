import { Link, Links } from "react-router-dom"
// import { MenuBar } from "./Menu_bar"

export const categories_List = [
    { name: 'All Categories', Link: "/allcategories" },
    { name: 'Laptops', Link: "/laptops" },
    { name: 'Mobile', Link: "/mobile" },
    { name: "Desktops", Link: '/desktops' },
    { name: "Tablets", Link: '/tablets' },
    { name: "Monitors", Link: '/monitors' },
    { name: "Mobile Accessories", Link: '/mobileaccessories' },
    { name: "Computer Accessories", Link: '/computeraccessories' },
    { name: "Storage", Link: '/storage' },
    { name: "Camera", Link: '/camera' },
    { name: "Electronics", Link: '/electronics' },
]

export const categories_by_brands = [
    { brandName: "Apple", brandLink: '/apple' },
    { brandName: "Samsung", brandLink: '/samsung' },
    { brandName: "Oneplus", brandLink: '/oneplus' },
    { brandName: "Realme", brandLink: '/realme' },
    { brandName: "Redmi", brandLink: '/redmi' },
    { brandName: "Vivo", brandLink: '/vivo' },
    { brandName: "Nokia", brandLink: '/nokia' },
    { brandName: "Motorola", brandLink: '/motorola' },
    { brandName: "Ambrane", brandLink: '/ambrane' },
]



function Header({categoryList, brandList}) {

    return (
        <>
            {/* Main header */}
            <header>
                <nav className="navbar" style={{ boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)' , height: '80px'}}>
                    {/* <!-- Header Logo --> */}
                    <div id="logo">
                        <Link to="/"><img src="/images/logo/logo.png" alt="E-commerce Website" to="/" /></Link>
                        <Link to="/">
                            <div id="logo-name" style={{ fontSize: '1.5rem' }}>E-commerce</div>
                        </Link>
                    </div>

                    {/* <!-- Header bar links --> */}
                    <div className="navbar-links-box" style={{ width: '70%', textAlign: 'center' }}>
                        <div className="catogories-box" style={{ border: '1.5px solid black' }}>
                            <select name="select_category" className="select-category">
                                {categoryList.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>

                                ))}
                            </select>
                            <input type="search" className="catrgory_search" placeholder="Search by name, category, or other" />

                            <button className="search-btn">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            {/* <MenuBar/> */}






                        </div>
                    </div>

                    <div className="login-signup-box" style={{ width: "15%" }}>
                        <ul style={{ display: 'flex' }}>
                            <li className="item">
                                <Link to="/login" >Login</Link>
                                {/* <a href="/login">Login</a> */}
                            </li>
                            <li className="item"><Link to="/signup">Sign Up</Link></li>
                        </ul>
                    </div>
                </nav>


                {/* category Header */}

                <nav className="navbar" style={{boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'}}>
                    <div className="categories_list">
                        {categoryList.map((item, index) => (
                            <Link key={index} to={item.Link}>{item.name}</Link>
                        ))}

                        {/* <Link>Mobile</Link>
                        <Link>Computer</Link>
                        <Link>Mobile Accessories</Link>
                        <Link>Computer Accessories</Link>
                        <Link>Camera</Link>
                        <Link>Electronics</Link> */}
                    </div>


                </nav>

            </header>
        </>
    )
}


export default Header