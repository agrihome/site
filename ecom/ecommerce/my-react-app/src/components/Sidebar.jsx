import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (

    <div className="w-80 h-screen pt-16 border-r-2 opacity-75 font-bold text-lg text-grey-800">
      <ul className="menu w-full mt-5 ">
        <li >
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={activeLink === '/' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <details open>
            <summary>Product</summary>
            <ul>
              <li>
                <Link
                  to="/product"
                  onClick={() => handleLinkClick('/product')}
                  className={activeLink === '/product' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/product/1"
                  onClick={() => handleLinkClick('/product/1')}
                  className={activeLink === '/product/1' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
                >
                  Product Detail
                </Link>
              </li>
              <li>
                <Link
                  to="/new/product"
                  onClick={() => handleLinkClick('/new/product')}
                  className={activeLink === '/new/product' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
                >
                  New Product
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Order</summary>
            <ul>
              <li>
                <Link
                  to="/order"
                  onClick={() => handleLinkClick('/order')}
                  className={activeLink === '/order' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/order/1"
                  onClick={() => handleLinkClick('/order/1')}
                  className={activeLink === '/order/1' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
                >
                  Order Detail
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link
            to="/crm"
            onClick={() => handleLinkClick('/crm')}
            className={activeLink === '/crm' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
          >
            CRM
          </Link>
        </li>
        <li>
          <Link
            to="/account"
            onClick={() => handleLinkClick('/account')}
            className={activeLink === '/account' ? 'underline decoration-[#7091E6] decoration-4 underline-offset-4' : ''}
          >
            Account
          </Link>
        </li>
      </ul>
    </div>

  );
};

export default Sidebar;
