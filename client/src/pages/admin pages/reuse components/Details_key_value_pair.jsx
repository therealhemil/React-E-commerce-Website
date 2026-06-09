import React, { useState } from "react";
import toast from "react-hot-toast";

export function Details_components({ details, setDetails, labelName }) {

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  console.log("All Details list: ", details);

  const addMoreDetails = () => {
    if (!newKey.trim() || !newValue.trim()) {
      toast.error("Enter Product Specification");
      return;
    }

    setDetails(prev => [
      ...prev, {
        [newKey]: newValue
      }
    ])

    setNewKey("");
    setNewValue("");
  };

  const handleEdit = (index) => {
    const key = Object.keys(details[index])[0];
    const value = details[index][key];

    setNewKey(key);
    setNewValue(value);
    setEditIndex(index);
  };

  const updateDetail = () => {
    const updated = [...details];

    updated[editIndex] = {
      [newKey]: newValue
    }

    setDetails(updated);

    setEditIndex(null);
    setNewKey("");
    setNewValue("");
  };

  const removeDetail = (index) => {
    setDetails(prev =>
      prev.filter((_, i) => i !== index)
    );
  };



  return (
    <>
      <div style={{ marginTop: '15px' }}>
        {typeof labelName === 'string'}{
          <h3>{labelName || ""}</h3>
        }
      </div>


      <div className="form-group details-container" style={{ maxWidth: "930px", margin: "15px auto" }}>

        <div className="detail-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", alignItems: "center", justifyContent: 'space-between' }} >
          {/* <strong>{index + 1}</strong> */}
          <input type="text" value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="Product Detail (e.g. Product Ram)" style={{ width: "45%", padding: "8px" }} />

          <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Product Value (e.g. 8GB, 16GB)" style={{ width: "45%", padding: "8px" }} />

          <div className="add-more-button" style={{ width: '12%', display: 'flex', flexDirection: 'row-reverse' }}>
            <button className="addMore-detail-button" style={{ width: '100%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white', border: 'none' }} type="button" onClick={editIndex !== null ? UpdateDetail : addMoreDetails} >
              {editIndex !== null ? 'Update' : 'Add Detail'}
            </button>
          </div>
        </div>


      </div >
    </>
  );
}
// {details && details.length > 1 ? (
//   <>
//     {Object.entries(details[0]).map(([key, value], index) => (
//       <div key={key} className="detail-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", alignItems: "center", justifyContent: 'space-between' }} >
//         <strong>{key + 1}</strong>
//         <input type="text" placeholder="Product Detail (e.g. Product Ram)" value={key} style={{ width: "45%", padding: "8px" }} />

//         <input type="text" placeholder="Prouduct Value (e.g. 8GB, 16GB)" value={value} style={{ width: "45%", padding: "8px" }} />

//         <div className="add-more-button" style={{ width: '17%', display: 'flex', gap: '7px' }}>
//           <button className="addMore-detail-button" style={{ width: '100%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white', border: 'none' }} type="button" onClick={() => handleEdit(index)} >
//             Edit
//           </button>
//           <button className="delete-detail-button" style={{ width: '100%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#ff0000e6', color: 'white', border: 'none' }} type="button" onClick={() => removeDetail(index)} >
//             Delete
//           </button>
//         </div>
//       </div>

//     ))}
//   </>
// ) : (
//   <>
//     {/* <h1>No Details</h1> */}
//   </>
// )}