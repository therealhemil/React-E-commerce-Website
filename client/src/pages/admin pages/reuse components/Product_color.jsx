import { useState } from "react";
import toast from "react-hot-toast";


export function ProductColors({ color, setColor, labelName, style }) {
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("#ffffff");
    const [editIndex, setEditIndex] = useState(null);


    const handleAddOrUpdate = () => {

        if (!colorName.trim()) {
            return toast.error("Enter color name");
        }

        const newColor = { color_name: colorName, color_hex: colorHex };

        if (editIndex !== null) {
            const updated = [...color];
            updated[editIndex] = newColor;
            setColor(updated);
            setEditIndex(null);
        } else {
            setColor([...color, newColor]);
        }

        setColorName("");
        setColorHex("#ffffff");
    };

    const handleEdit = (index) => {
        setColorName(color[index].color_name);
        setColorHex(color[index].color_hex);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setColor(color.filter((_, i) => i !== index));

        if (editIndex === index) {
            setColorName("");
            setColorHex("#ffffff");
            setEditIndex(null);
        }
    };

    const handleColorChange = (index, field, value) => {
        const updated = [...color];
        updated[index][field] = value;
        setColor(updated);
    };

    return (
        <div className="form-group" style={style}>
            {typeof labelName === 'string' ? (
                <label>{labelName || ""}</label>
            ) : ("")}

            {/* Input Section */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px", alignItems: "center", }} >
                <div style={{ width: '70%' }}>
                    <input type="text" placeholder="Color Name" value={colorName} onChange={(e) => setColorName(e.target.value)} style={{ flex: 1, width: '100%' }} />
                </div>

                <div className="color-picker-container">
                    <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="color-picker" />
                </div>

                <button type="button" className="color-add-button" onClick={handleAddOrUpdate} >
                    {editIndex !== null ? "Update" : "Add Color"}
                </button>
            </div>



            {color && color.length > 0 ? (

                <div className="details-container" style={{ display: 'grid', overflowY: 'auto', maxHeight: '100px', gap: '5px' }}>
                    {color?.map((item, index) => (
                        <>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} key={index}>

                                <span>{index + 1}</span>

                                <div style={{ width: '60%' }}>
                                    <input type="text" value={item.color_name} style={{ width: '100%', cursor: 'not-allowed' }} disabled />
                                </div>

                                <div className="color-picker-container">
                                    <input type="color" value={item.color_hex} className="color-picker" disabled style={{ cursor: 'not-allowed' }} />
                                </div>

                                <div style={{ display: 'flex', gap: '5px' }}>

                                    <button type="button" className="color-add-button" onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                    <button type="button" className="color-add-button delete-button" onClick={() => handleDelete(index)}>Delete </button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <>
                    <div className=""></div>
                </>
            )}



            {/* Table */}
            {/* {color && color.length > 0 ? (
                <>

                    <div className="details-container" style={{ maxHeight: "130px", overflowY: "auto", }} >
                        <table style={{ width: "100%", borderCollapse: "collapse", border: '1px solid' }} >
                            <thead style={{ border: '1px solid' }}>
                                <tr>
                                    <th></th>
                                    <th>Preview</th>
                                    <th>Color Name</th>
                                    <th>Hex Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {color.length > 0 ? (
                                    color.map((item, index) => (
                                        <tr key={index} style={{ border: '1px solid' }}>
                                            <td style={{ textAlign: 'end' }}>{index + 1}</td>

                                            <td style={{ display: 'flex', justifyContent: 'center', padding: '5px', alignItems: 'center' }}>
                                                <div style={{ width: "25px", height: "25px", background: item.color_hex, border: "1px solid #ddd", borderRadius: "50%", }} />
                                            </td>

                                            <td style={{ textAlign: 'center' }}>{item.color_name}</td>

                                            <td style={{ textAlign: 'center' }}>{item.color_hex}</td>

                                            <td style={{ textAlign: 'center', width: '115px' }}>
                                                <button type="button" className="color-edit-delete" onClick={() => handleEdit(index)} style={{ marginRight: "8px", width: '35px', borderRadius: '25px' }} >
                                                    Edit
                                                </button>

                                                <button type="button" className="color-edit-delete" onClick={() => handleDelete(index)} style={{ background: "red", color: "#fff", width: '50px', borderRadius: '25px' }} >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "10px", }} >
                                            No colors added
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className=""></div>
            )} */}

        </div>
    );
}



export function NewAddProductColors({ color, setColor, style }) {
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("#ffffff");
    const [editIndex, setEditIndex] = useState(null);


    const handleAddOrUpdate = () => {

        if (!colorName.trim()) {
            return toast.error("Enter color name");
        }

        const newColor = { color_name: colorName, color_hex: colorHex };

        if (editIndex !== null) {
            const updated = [...color];
            updated[editIndex] = newColor;
            setColor(updated);
            setEditIndex(null);
        } else {
            setColor([...color, newColor]);
        }

        setColorName("");
        setColorHex("#ffffff");
    };

    return (
        <div className="form-group" style={style}>

            {/* Input Section */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px", alignItems: "center", }} >
                <div style={{ width: '70%' }}>
                    <input type="text" placeholder="Color Name" value={colorName} onChange={(e) => setColorName(e.target.value)} style={{ flex: 1, width: '100%' }} />
                </div>

                <div className="color-picker-container">
                    <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="color-picker" style={{cursor: 'pointer'}} />
                </div>

                <button type="button" className="color-add-button" onClick={handleAddOrUpdate} >
                    {editIndex !== null ? "Update" : "Add Color"}
                </button>
            </div>

        </div>
    );
}
