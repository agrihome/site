import * as React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  

  return (
    <div className="w-80 border-r-2 h-screen  ">

      <div className='w-full border-b py-5 '>

        <div className='inline-flex ml-6'>
          Adhithan RM
        </div>

      </div>
      
      <ul className="menu w-full mt-5">
        <li><Link to='/'>Dashboard</Link></li>
        <li>
          <details open>
            <summary>Product</summary>
            <ul>
              <li><Link to='/product'>Products</Link></li>
              <li><Link to='/product/1'>Product Detail</Link></li>
              <li><Link to='/new/product'>New Product</Link></li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Order</summary>
            <ul>
              <li><Link to='/order'>Orders</Link></li>
              <li><Link to='/order/1'>Order Detail</Link></li>
            </ul>
          </details>
        </li>

        <li><Link to='/crm'>CRM</Link></li>
        <li><Link to='/account'>Account</Link></li>
      </ul>

    </div>
  );

};

export default Sidebar;
