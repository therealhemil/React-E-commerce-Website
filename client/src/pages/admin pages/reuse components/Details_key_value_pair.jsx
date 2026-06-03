import React, { useState } from "react";

export function Details_components({details,
  setDetails}) {

  const addMoreDetails = () => {
    setDetails([
      ...details,
      { key: "", value: "" }
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const removeDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  return (
    <>
      <div style={{ marginTop: '15px' }}>
        <h3>Category Description</h3>
        {/* <h3>Product Details</h3> */}
      </div>

      <div className="form-group details-container" style={{ maxWidth: "930px", margin: "15px auto" }}>

        {details.map((detail, index) => (
          <div
            className="detail-row"
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              alignItems: "center"
            }}
          >
            <strong>{index + 1}</strong>
            <input
              type="text"
              placeholder="Product Detail (e.g. Product Ram)"
              value={detail.key}
              onChange={(e) =>
                handleChange(index, "key", e.target.value)
              }
              style={{
                width: "50%",
                padding: "8px"
              }}
            />

            <input
              type="text"
              placeholder="Product Value (e.g. 8GB, 16GB)"
              value={detail.value}
              onChange={(e) =>
                handleChange(index, "value", e.target.value)
              }
              style={{
                width: "50%",
                padding: "8px"
              }}
            />

            {details.length > 1 && (

              <button
                style={{
                  borderRadius: '25px',
                  height: '30px',
                  width: '65px',
                  backgroundColor: '#ff0000e6',
                  color: 'white'
                }}
                type="button"
                onClick={() => removeDetail(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="add-more-button" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button
            style={{ width: '30%', height: '35px', borderRadius: '25px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white' }}
            type="button"
            onClick={addMoreDetails}
          >
            + Add More Details
          </button>
        </div>

        {/* <pre style={{ marginTop: "20px" }}>
        {JSON.stringify(details, null, 2)}
      </pre> */}
      </div >
    </>
  );
}