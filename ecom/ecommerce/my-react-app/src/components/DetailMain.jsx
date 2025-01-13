import React, { useEffect, useState } from "react";
import { getDetail, getMeta, updateDetail, deleteDetail } from "../api"; 

export default function DetailMain({model, id, detailFields, nonEditFields}) {

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [meta, setMeta] = useState({});
  const [edit, setEdit] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


  useEffect(() => {

    console.log(id)

    const loadDetails = async () => {
      setLoading(true);

      try {
        const response = await getDetail(model,id);
        setDetail(response);
        const meta_response = await getMeta(capitalize(model));
        setMeta(meta_response);

      } catch (error) {
        console.error("Failed to load product:", error);
      }

      setLoading(false);
    };

    loadDetails();
  }, [id]);

  const handleInputChange = (key, value) => {
    setDetail((detail) => ({
      ...detail,
      [key]: value,
    }));
  };

  const DetailKeys = Object.keys(meta).filter(
    (key) => !detailFields.includes(key)
  );

  const renderInput = (key) => {

    console.log(meta[key]);

    if (['DecimalField','PositiveIntegerField'].includes(meta[key].field_type)) {
      return (
        <input
          type="number"
          placeholder={`Enter ${key}`}
          className="input input-bordered w-full max-w-xs"
          value={detail[key] || ""}
          readOnly={!(edit && !nonEditFields.includes(key))}
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      );
    } 
    else if (meta[key].field_type === "SelectField" || meta[key].is_select_field) {
      return (
        <select
          className="select select-bordered w-full max-w-xs"
          value={detail[key] || ""}
          disabled={!(edit && !nonEditFields.includes(key))}
          onChange={(e) => handleInputChange(key, e.target.value)}
        >
            <option key={''} value={''} disabled selected>
            </option>
            

          {meta[key].choices.map((choice, index) => (
            <option key={index} value={choice[0]}>
              {choice[1]}
            </option>
          ))}
        </select>
      );
    }
    else if (meta[key].field_type == 'TextField') {
      return (

        <textarea 
        className="textarea textarea-bordered w-full max-w-xs" 
        placeholder="Bio"
        value={detail[key] || ""}
        readOnly={!(edit && !nonEditFields.includes(key))}
        onChange={(e) => handleInputChange(key, e.target.value)}
        
        ></textarea>

      );

    } 
    else if (meta[key].field_type == 'BooleanField') {
      return (

        
        <input type="checkbox" className="checkbox checkbox-sm" 
          value={detail[key] || ""}
          disabled={!(edit && !nonEditFields.includes(key))}
          onChange={(e) => handleInputChange(key, e.target.value)}
        />

      )
    }
    else {
      return (
        <input
          type="text"
          placeholder={`Enter ${key}`}
          className="input input-bordered w-full max-w-xs"
          value={detail[key] || ""}
          readOnly={!(edit && !nonEditFields.includes(key))}
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      ); 
    }
  };

  const saveDetail = async () => {

    const response = await updateDetail(model,id,detail);
    console.log(response);


  }


  const deleteDtl = async () => {

    const response = await deleteDetail(model,id,detail);
    console.log(response);


  }
  
  return (

    <div className="relative w-full overflow-x-auto mt-5 ">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (

        <div class="w-full flex flex-col space-y-5">

          <div className="w-11/12 rounded-lg bg-gray-50 mx-auto px-5 py-2 flex justify-between items-center">
              
              <div className="inline-flex gap-3 items-center">
                  <span>{ capitalize(model) }</span>
                  <span className="badge badge-secondary p-3">{ id }</span>
              </div>

              <div className="inline-flex gap-3 items-center">

                  <span className="label-text">Edit</span>
                  <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={edit}
                  onChange={() => setEdit(!edit)}
                  />


                  <button className="btn btn-primary btn-sm"onClick={saveDetail}>Save</button>
                  <button className="btn btn-primary btn-sm" onClick={deleteDtl}>Delete</button>


              </div>
          
          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-11/12 mx-auto self-center border p-5 rounded-md">
            {DetailKeys.map((key) => (

              <label key={key} className="form-control w-full max-w-xs">

                <div className="label">
                  <span className="label-text">{capitalize(key)}</span>
                </div>

                { renderInput(key) }
                
              </label>

            ))}

          </div>

          <div className="w-11/12 flex flex-col mx-auto space-y-3">

          <div class="inline-flex gap-2 items-center">
            <span class="badge badge-ghost badge-xs"></span>
            <span>created at</span>
            <span>{ new Date(detail.created_at).toLocaleString() }</span>
          </div>

          <div class="inline-flex gap-2 items-center">
            <span class="badge badge-ghost badge-xs"></span>
            <span>updated at</span>
            <span>{ new Date(detail.updated_at).toLocaleString() }</span>
          </div>

          </div>

        </div>

      )}
    </div>
  );


}
