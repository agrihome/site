import React, { useEffect, useState } from "react";
import DetailMain from "../components/DetailMain";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductDetail() {

  const params = useParams();
  const order_id = params.order_id;
  const detailFields = ["created_at", "updated_at", "primary_key"]; 
  const nonEditFields = ["order_id"]; 


  return (

    <div className="relative w-full overflow-x-auto mt-5 ">
      
          {
            <DetailMain model="order" id={order_id} detailFields={detailFields} nonEditFields={nonEditFields} />
          }

    </div>

  );
}
