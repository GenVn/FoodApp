import {
  MdShoppingCart,
  MdAdd,
  MdLogout,
  MdHome,
  MdMenuBook,
  MdSupervisedUserCircle,
  MdAllInbox,
} from "react-icons/md";
import { useState } from "react";

import Logo from "../assests/img/logo.png";
import Avatar from "../assests/img/avatar.png";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };
  const logout = () => {
    setisMenu(false);
    localStorage.removeItem("user");
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:px-16 bg-primary">
      {/* Desktop & Tablet Menu */}
      <div className="hidden md:flex w-full h-full p-4 items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-9 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out">
              Home
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out">
              Menu
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out">
              About Us
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out">
              Services
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full bg-cartNumBg flex justify-center items-center ">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              onClick={login}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full shadow-xl cursor-pointer"
              alt="userprofile"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
              >
                {user && user.email === "kairio2001@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all
               duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setisMenu(false)}
                    >
                      New Item <MdAdd />{" "}
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all
               duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Moblie menu */}
      <div className="flex items-center justify-between md:hidden w-full h-full p-2">
        <div className="relative flex items-center justify-center">
          <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full bg-cartNumBg flex justify-center items-center ">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-9 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            onClick={login}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full shadow-xl cursor-pointer"
            alt="userprofile"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
            >
              {user && user.email === "kairio2001@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all
               duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setisMenu(false)}
                  >
                    New Item <MdAdd />{" "}
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  className="hover:bg-slate-100 px-4 py-2 flex gap-3 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out"
                  onClick={() => setisMenu(false)}
                >
                  Home
                  <MdHome />
                </li>
                <li
                  className="hover:bg-slate-100 px-4 py-2 flex gap-3 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out"
                  onClick={() => setisMenu(false)}
                >
                  Menu
                  <MdMenuBook />
                </li>
                <li
                  className="hover:bg-slate-100 px-4 py-2 flex gap-3 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out"
                  onClick={() => setisMenu(false)}
                >
                  About Us
                  <MdSupervisedUserCircle />
                </li>
                <li
                  className="hover:bg-slate-100 px-4 py-2 flex gap-3 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-out"
                  onClick={() => setisMenu(false)}
                >
                  Services
                  <MdAllInbox />
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md justify-center px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all
               duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
