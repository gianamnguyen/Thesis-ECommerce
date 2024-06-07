import './Navbar.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// @antd
import {
  UserOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';

// @assets
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'

// @service
import { getListCategories } from '../../service/category'

// @constants
import { SUCCESS, USER_INFO } from '../../constants'

// @utility
import { getUserToken } from '../../utility'
import { cartUser/* , loadingCart, failCart, successCart  */ } from '../../redux/cart/selector'

// @action
import { resetCart } from "../../redux/cart/actions"

const items = [
  {
    key: '1',
    label: (
      <Link to={"/manage-orders"}>
        Manage orders
      </Link>
    ),
  },
  // {
  //   key: '2',
  //   label: (
  //     <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
  //       2nd menu item (disabled)
  //     </a>
  //   ),
  // },
];

const Navbar = () => {
  const dispatch = useDispatch()
  const userToken = getUserToken()
  const userCart = useSelector(cartUser)
  // const cartLoading = useSelector(loadingCart)
  // const cartFail = useSelector(failCart)
  // const cartSuccess = useSelector(successCart)

  // console.log("cart: ", { userCart, cartLoading, cartFail, cartSuccess })

  const [categories, setCategories] = useState([])

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  useEffect(() => {
    fetchGetListCategories()
  }, [])

  const fetchGetListCategories = async (payload) => {
    try {
      const res = await getListCategories(payload)
      if (res?.retCode === SUCCESS) {
        setCategories(res?.retData)
      } else {
        setCategories([])
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {

    }
  }

  return (
    <div className='nav'>
      <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>GinSHOP</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        {categories?.length > 0 && (
          <ul ref={menuRef} className="nav-menu">
            {categories?.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/category/${item?._id}`} style={{ textDecoration: 'none' }}>{item?.name}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </ul>
      <div className="nav-login-cart">
        {!!userToken
          ? <button
            onClick={() => {
              localStorage.removeItem(USER_INFO)
              dispatch(resetCart())
              setTimeout(() => {
                window.location.href = "/"
              }, 1000)
            }}
          >
            Logout
          </button>
          : <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        }
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">
          {Object.keys(userCart).length > 0 ? userCart?.listProduct?.length : 0}
        </div>
        <Dropdown menu={{ items }}>
          <UserOutlined style={{ fontSize: 35, cursor: "pointer" }} />
        </Dropdown>
      </div>
    </div>
  )
}

export default Navbar
