import React, { useState } from "react";
import toast from "react-hot-toast";

export function Details_components({ details, setDetails, labelName }) {

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // const addMoreDetails = () => {
  //   setDetails([
  //     ...details,
  //     { key: "", value: "" }
  //   ]);
  // };

  console.log("All Details list: ", details);
  

  const addMoreDetails =()=>{
    if(!newKey.trim() || !newValue.trim()){
      toast.error('Enter Product Specification')
      return 
    }

    setDetails(prevDetail => [
      ...prevDetail,
      {key: newKey, value : newValue}
    ])

    setNewKey('')
    setNewValue('')
  }

  const handleEdit = (index)=>{
    setNewKey(details[index].key)
    setNewValue(details[index].value)
    setEditIndex(index)
  }

  const UpdateDetail = ()=>{
    const Updated = [...details]
    Updated[editIndex] = {
      key: newKey,
      value : newValue
    }
    setDetails(Updated)

    setEditIndex(null)
    setNewKey('')
    setNewValue("")
  }



  const handleChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    console.log('Updated Details:', updatedDetails);

    setDetails(updatedDetails);
  };

  const removeDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
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

        {details && details.length > 0 ? (
          <>
            {details.map((detail, index) => (
              <div key={index} className="detail-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", alignItems: "center", justifyContent: 'space-between' }} >
                <strong>{index + 1}</strong>
                <input type="text" placeholder="Product Detail (e.g. Product Ram)" value={detail.key}  style={{ width: "45%", padding: "8px" }} />

                <input type="text" placeholder="Prouduct Value (e.g. 8GB, 16GB)" value={detail.value}  style={{ width: "45%", padding: "8px" }} />

                <div className="add-more-button" style={{ width: '17%', display: 'flex', gap: '7px' }}>
                  <button className="addMore-detail-button" style={{ width: '100%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white', border: 'none' }} type="button" onClick={()=> handleEdit(index)} >
                    Edit
                  </button>
                  <button className="delete-detail-button" style={{ width: '100%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#ff0000e6', color: 'white', border: 'none' }} type="button" onClick={() => removeDetail(index)} >
                    Delete
                  </button>
                </div>
              </div>

              // <div className="detail-row" key={index} style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "center", justifyContent: 'space-between' }} >
              //   <strong>{index + 1}</strong>

              //   <div className="add-more-button" style={{ display: 'flex' }}>
              //     <button style={{ width: '30%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white' }} type="button" onClick={addMoreDetails} >
              //       Edit
              //     </button>
              //     <button style={{ borderRadius: '25px', height: '30px', width: '65px', backgroundColor: '#ff0000e6', color: 'white' }} type="button" onClick={() => removeDetail(index)} >
              //       Remove
              //     </button>
              //   </div>

              // </div>
            ))}
          </>
        ) : (
          <>
            {/* <h1>No Details</h1> */}
          </>
        )}

      </div >
    </>
  );
}