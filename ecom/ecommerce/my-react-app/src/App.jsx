import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Appbar from './components/Appbar'
import Home from './pages/Home'
import Order from './pages/Order'
import Account from './pages/Account'
import ProductDetail from './pages/ProductDetail'
import New from './pages/New'
import OrderDetail from './pages/OrderDetail'
import Product from './pages/Product'
import Crm from './pages/Crm'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <Router>
      <div className="flex w-full text-md ">
        {showSideBar && <Sidebar />}

        <div className="flex flex-col h-screen w-full text-md">
          <Appbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

          <div className="w-full h-full overflow-auto">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/order">
                <Order />
              </Route>
              <Route exact path="/crm">
                <Crm />
              </Route>
              <Route exact path="/order/:order_id">
                <OrderDetail />
              </Route>
              <Route exact path="/product">
                <Product />
              </Route>
              <Route exact path="/product/:product_id">
                <ProductDetail />
              </Route>
              <Route exact path="/new/:model">
                <New />
              </Route>
              <Route exact path="/account">
                <Account />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;



