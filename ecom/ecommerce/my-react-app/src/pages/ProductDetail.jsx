import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import DetailMain from "../components/DetailMain";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductDetail() {
  
  const params = useParams();
  const product_id = params.product_id;
  const detailFields = ["created_at", "updated_at", "primary_key"]; 
  const nonEditFields = ["product_id"]; 

  return (

    <div className="relative w-full overflow-x-auto mt-5 ">
      
          {
            <DetailMain model="product" id={product_id} detailFields={detailFields} nonEditFields={nonEditFields} />
          }

    </div>

  );

}
