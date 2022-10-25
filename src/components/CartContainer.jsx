import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../assests/img/emptyCart.svg";
import CartItems from "./CartItems";
import { useEffect, useState } from "react";

const CartContainer = () => {
   // eslint-disable-next-line no-unused-vars
   const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
   const [flag, setFlag] = useState(1);
   const [tot, setTot] = useState(0);
   const showCart = () => {
      dispatch({
         type: actionType.SET_CART_SHOW,
         cartShow: !cartShow,
      });
   };

   useEffect(() => {
      let totalPrice = cartItems.reduce(function (accumulator, item) {
         return accumulator + item.qty * item.price;
      }, 0);
      setTot(totalPrice);
      console.log(tot);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tot, flag]);

   const clearCart = () => {
      dispatch({
         type: actionType.SET_CARTITEMS,
         cartItems: [],
      });

      localStorage.setItem("cartItems", JSON.stringify([]));
   };
   return (
      <motion.div
         initial={{ opacity: 0, x: 200 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 200 }}
         className="w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col 
  fixed top-0 right-0 z-[101]"
      >
         <div className="w-full flex items-center justify-between p-4">
            <motion.div whileTap={{ scale: 0.75 }}>
               <MdOutlineKeyboardBackspace
                  className="text-3xl text-textColor cursor-pointer"
                  onClick={showCart}
               />
            </motion.div>
            <p className="text-3xl text-textColor font-semibold">Cart </p>
            <motion.p
               whileTap={{ scale: 0.75 }}
               className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md
        duration-100 transition-all ease-in-out cursor-pointer text-base text-textColor"
               onClick={clearCart}
            >
               Clear <RiRefreshFill />
            </motion.p>
         </div>
         {cartItems && cartItems.length > 0 ? (
            <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
               <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                  {cartItems.map((item) => (
                     <CartItems
                        key={item.id}
                        data={item}
                        setFlag={setFlag}
                        flag={flag}
                     />
                  ))}
               </div>

               <div
                  className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center 
           justify-evenly px-8 py-2"
               >
                  <div className="w-full flex items-center justify-between">
                     <p className="text-gray-400 text-lg">Subtotal</p>
                     <p className="text-gray-400 text-lg">
                        $ {parseFloat(tot).toFixed(2)}
                     </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                     <p className="text-gray-400 text-lg">Delivery</p>
                     <p className="text-gray-400 text-lg">$ 25</p>
                  </div>

                  <div className="w-full border-b border-gray-600 my-2"></div>
                  <div className="w-full flex items-center justify-between">
                     <p className="text-gray-200 text-xl font-semibold">
                        Total
                     </p>
                     <p className="text-gray-200 text-xl font-semibold">
                        $ {tot + 25}
                     </p>
                  </div>
                  {user ? (
                     <motion.button
                        whileTap={{ scale: 0.8 }}
                        type="button"
                        className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                     >
                        Check Out
                     </motion.button>
                  ) : (
                     <motion.button
                        whileTap={{ scale: 0.8 }}
                        type="button"
                        className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                     >
                        Login To Checkout
                     </motion.button>
                  )}
               </div>
            </div>
         ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
               <img src={EmptyCart} alt="" className="w-300" />
               <p className="text-xl text-textColor font-semibold">
                  Add some items in your cart
               </p>
            </div>
         )}
      </motion.div>
   );
};

export default CartContainer;
