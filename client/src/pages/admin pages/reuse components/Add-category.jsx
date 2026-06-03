import React from "react";
import "../../../../public/css/Admin css/admin_addCategory.css";

const tableData = [
    {
        id: 1,
        user: {
            image: "/images/user/user-17.jpg",
            name: "Lindsey Curtis",
            role: "Web Designer",
        },
        projectName: "Agency Website",
        team: {
            images: [
                "/images/user/user-22.jpg",
                "/images/user/user-23.jpg",
                "/images/user/user-24.jpg",
            ],
        },
        budget: "3.9K",
        status: "Active",
    },
    {
        id: 2,
        user: {
            image: "/images/user/user-18.jpg",
            name: "Kaiya George",
            role: "Project Manager",
        },
        projectName: "Technology",
        team: {
            images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
        },
        budget: "24.9K",
        status: "Pending",
    },
    {
        id: 3,
        user: {
            image: "/images/user/user-17.jpg",
            name: "Zain Geidt",
            role: "Content Writing",
        },
        projectName: "Blog Writing",
        team: {
            images: ["/images/user/user-27.jpg"],
        },
        budget: "12.7K",
        status: "Active",
    },
    {
        id: 4,
        user: {
            image: "/images/user/user-20.jpg",
            name: "Abram Schleifer",
            role: "Digital Marketer",
        },
        projectName: "Social Media",
        team: {
            images: [
                "/images/user/user-28.jpg",
                "/images/user/user-29.jpg",
                "/images/user/user-30.jpg",
            ],
        },
        budget: "2.8K",
        status: "Cancel",
    },
    {
        id: 5,
        user: {
            image: "/images/user/user-21.jpg",
            name: "Carla George",
            role: "Front-end Developer",
        },
        projectName: "Website",
        team: {
            images: [
                "/images/user/user-31.jpg",
                "/images/user/user-32.jpg",
                "/images/user/user-33.jpg",
            ],
        },
        budget: "4.5K",
        status: "Active",
    },
];

const getBadgeClass = (status) => {
    switch (status) {
        case "Active":
            return "badge success";
        case "Pending":
            return "badge warning";
        default:
            return "badge error";
    }
};

function BasicTableOne() {
    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Image</th>
                            <th>Category Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((order) => (
                            <tr key={order.id}>
                                <td>
                                    <div className="user-info">
                                        <img
                                            src={order.user.image}
                                            alt={order.user.name}
                                            className="user-image"
                                        />

                                        <div>
                                            <h4>{order.user.name}</h4>
                                            <span>{order.user.role}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>{order.projectName}</td>

                                <td>
                                    <div className="team-images">
                                        {order.team.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Team ${index}`}
                                                className="team-image"
                                            />
                                        ))}
                                    </div>
                                </td>

                                <td>
                                    <span className={getBadgeClass(order.status)}>
                                        {order.status}
                                    </span>
                                </td>

                                <td>{order.budget}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export{ BasicTableOne}