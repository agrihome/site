import React, { useEffect, useState } from "react";
import { getOrders } from "../api";
import { Link } from 'react-router-dom';

export default function Product() {

  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (customerId !== null) {
      loadCrm(customerId);
    }
  }, [customerId]);

  const loadCrm = async (customerId) => {
    setLoading(true);

    const filter = {
      customer: customerId
    };

    try {
      const response = await getOrders( filter );
      setOrders(response); // Assuming response is an array of orders
    } catch (error) {
      console.error("Failed to load orders:", error);
    }

    setLoading(false);
  };

  const columns = orders.length > 0 ? Object.keys(orders[0]).slice(0, 5) : [];

  return (
    <div className="relative w-full overflow-x-auto p-10">

      <div className="flex flex-col w-full space-y-2 mb-5">
        <div className="w-11/12 rounded-lg bg-gray-50 mx-auto px-5 py-2 flex justify-between items-center">
          <div className="inline-flex gap-3 items-center">
            <span>CRM</span> 
          </div> 

          <div className="join">
            <div>
              <input
                className="input input-bordered input-sm join-item"
                placeholder="Customer Id"
                onChange={(e) => setCustomerId(e.target.value)} // Sets customerId on input change
              />
            </div>
            
            <div className="indicator">
              <button
                className="btn btn-primary btn-sm join-item"
                onClick={() => loadCrm(customerId)} // Trigger load with the current customerId
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <h4 className="text-center">Enter Customer Id</h4>
      ) : (
        <div className="flex flex-col w-full space-y-2">
          <div className="w-11/12 rounded-lg bg-gray-50 mx-auto px-5 py-2 flex justify-between items-center">
            <div className="inline-flex gap-3 items-center">
              <span>Orders</span>
              <span className="badge badge-secondary p-3">{orders.length}</span>
            </div>

            <div className="join">
              <select className="select select-bordered select-sm join-item">
                <option disabled selected>
                  Filter
                </option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>

              <select className="select select-bordered select-sm join-item w-16">
                <option disabled selected></option>
                <option>=</option>
                <option>&lt;</option>
                <option>&gt;</option>
                <option>&lt;=</option>
                <option>&gt;=</option>
              </select>

              <div>
                <input
                  className="input input-bordered input-sm join-item"
                  placeholder="Search"
                />
              </div>

              <div className="indicator">
                <button className="btn btn-primary btn-sm join-item">
                  Search
                </button>
              </div>
            </div>
          </div>

          <table className="w-11/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto rounded-lg mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="h-4 overflow-y">
                <th className="px-6 py-4">
                  <input type="checkbox" className="checkbox checkbox-xs" />
                </th>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {column.replace(/_/g, " ").toUpperCase()}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 10).map((order, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                    index % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="px-6">
                    <input type="checkbox" className="checkbox checkbox-xs" />
                  </td>

                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-2">
                      {order[column]}
                    </td>
                  ))}

                  <Link to={`/order/${order.order_id}`}>
                    <td className="px-6 py-2 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-11/12 rounded-lg bg-gray-50 mx-auto px-5 py-2 flex justify-end items-center">
            <div className="join">
              <div className="join-item px-2 py-1">Rows</div>

              <select className="select select-bordered select-sm join-item">
                <option selected>10</option>
                <option>25</option>
                <option>100</option>
                <option>All</option>
              </select>

              <button className="btn btn-sm btn-ghost join-item font-light">
                &lt;
              </button>

              <div className="join-item px-2 py-1">1</div>

              <button className="btn btn-sm btn-ghost join-item font-light">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
