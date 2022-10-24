import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

let items = [];

const CartItems = ({ data, setFlag, flag }) => {
   const [qty, setQty] = useState(data.qty);
   const [{ cartItems }, dispatch] = useStateValue();

   const cartDispatch = () => {
      localStorage.setItem("cartItems", JSON.stringify(items));
      dispatch({
         action: actionType.SET_CART_ITEMS,
         cartItems: items,
      });
   };

   const updateQty = (action, itemId) => {
      if (action == "add") {
         setQty(qty + 1);
         cartItems.map((item) => {
            if (item.id === itemId) {
               item.qty += 1;
               setFlag(flag + 1);
            }
         });
         cartDispatch();
      } else {
         // initial state value is one so you need to check if 1 then remove it
         if (qty == 1) {
            items = cartItems.filter((item) => item.id !== itemId);
            setFlag(flag + 1);
            cartDispatch();
         } else {
            setQty(qty - 1);
            cartItems.map((item) => {
               if (item.id === itemId) {
                  item.qty -= 1;
                  setFlag(flag + 1);
               }
            });
            cartDispatch();
         }
      }
   };

   useEffect(() => {
      items = cartItems;
   }, [qty, items]);
   return (
      <div
         key={data.id}
         className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
      >
         <img
            src={data?.imgURL}
            alt=""
            className="w-20 h-20 max-w-[60px] 
                           rounded-full object-contain"
         />
         <div className="flex flex-col gap-2">
            <p className="text-base text-gray-50">{data?.title}</p>
            <p className="text-sm block text-gray-50 font-semibold">
               $ {parseFloat(data?.price * qty).toFixed(2)}
            </p>
         </div>
         <div className="group flex items-center gap-2 ml-auto cursor-pointer">
            <motion.div whileTap={{ scale: 0.75 }}>
               <BiMinus
                  className="text-gray-50 "
                  onClick={() => updateQty("remove", data?.id)}
               />
            </motion.div>
            <p className="w-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
               {qty}
            </p>
            <motion.div whileTap={{ scale: 0.75 }}>
               <BiPlus
                  className="text-gray-50 "
                  onClick={() => updateQty("add", data?.id)}
               />
            </motion.div>
         </div>
      </div>
   );
};

export default CartItems;
