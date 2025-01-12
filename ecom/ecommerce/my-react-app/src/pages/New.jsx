import React, { useEffect, useState } from "react";
import { getMeta, postNew } from "../api"; 
import { useRouteMatch } from "react-router-dom";

export default function New() {
  const model = useRouteMatch("/new/:model").params.model;
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [newValue, setNewValue] = useState({});
  const [edit, setEdit] = useState(true);
  const [editableFields, setEditableFields] = useState(["status", "quantity"]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      try {

        const meta_response = await getMeta(capitalize(model));
        setMeta(meta_response);

        const filteredKeys = Object.keys(meta_response).filter(
          (key) => !["created_at", "updated_at", "primary_key", meta_response["primary_key"].field_name].includes(key)
        );

        const initialValues = {};
        filteredKeys.forEach((key) => {
          initialValues[key] = null; 
        });

        setNewValue(initialValues);

      } catch (error) {
        console.error("Failed to load order:", error);
      }
      setLoading(false);
    };

    loadOrder();
  }, [model]);

  const handleInputChange = (key, value) => {
    setNewValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  const renderInput = (key) => {
    if (!meta[key]) return null;

    if (["DecimalField", "PositiveIntegerField"].includes(meta[key].field_type)) {
      return (
        <input
          type="number"
          placeholder={`Enter ${key}`}
          className="input input-bordered w-full max-w-xs"
          value={newValue[key] || ""}
          
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      );
    } else if (meta[key].field_type === "TextField") {
      return (
        <textarea
          className="textarea textarea-bordered w-full max-w-xs"
          placeholder={`Enter ${key}`}
          value={newValue[key] || ""}
          
          onChange={(e) => handleInputChange(key, e.target.value)}
        ></textarea>
      );
    } else if (meta[key].field_type === "BooleanField") {
      return (
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={newValue[key] || false}
          
          onChange={(e) => handleInputChange(key, e.target.checked)}
        />
      );
    } else if (meta[key].field_type === "SelectField" || meta[key].is_select_field) {
      return (
        <select
          className="select select-bordered w-full max-w-xs"
          value={newValue[key] || ""}
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
    } else {
      return (
        <input
          type="text"
          placeholder={`Enter ${key}`}
          className="input input-bordered w-full max-w-xs"
          value={newValue[key] || ""}
          
          onChange={(e) => handleInputChange(key, e.target.value)}
        />
      );
    }
  };

  const save = async () => {

    const response = await postNew( model, newValue);
    console.log(response)

  } 

  return (
    <div className="relative w-full overflow-x-auto mt-5">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        <div className="flex flex-col space-y-5">
          <div className="w-11/12 rounded-lg bg-gray-50 mx-auto px-5 py-2 flex justify-between items-center">
            <div className="inline-flex gap-3 items-center">
              <span>New {model}</span>
            </div>
            <div className="inline-flex gap-3 items-center">
              <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-11/12 mx-auto self-center border p-5 rounded-md">
            {Object.keys(newValue).map((key) => (
              <label key={key} className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">{capitalize(key)}</span>
                </div>
                {renderInput(key)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );




}
