import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import NotFound from "../assests/img/NotFound.svg";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const RowContainer = ({ flag, data, scrollValue }) => {
   // eslint-disable-next-line no-unused-vars
   const [{ cartItems }, dispatch] = useStateValue();
   const rowContainer = useRef();
   const [items, setItems] = useState([]);

   const addToCart = () => {
      dispatch({
         type: actionType.SET_CART_ITEMS,
         cartItems: items,
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
   };
   useEffect(() => {
      rowContainer.current.scrollLeft += scrollValue;
   }, [scrollValue]);

   useEffect(() => {
      addToCart();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [items]);
   return (
      <div
         ref={rowContainer}
         className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
            flag
               ? "overflow-x-scroll scrollbar-none"
               : "overflow-x-hidden flex-wrap justify-center"
         }`}
      >
         {data && data.length > 0 ? (
            data.map((item) => (
               <div
                  key={item.id}
                  className="w-275 min-w-[175px] md:w-340 md:min-w-[340px] h-56 my-12 bg-cardOverlay rounded-xl p-2 backdrop-blur-lg
        hover:drop-shadow-lg flex flex-col items-center justify-between"
               >
                  <div className="w-full flex items-center justify-between">
                     <motion.div
                        className="w-40 h-40 -mt-8 drop-shadow-2xl"
                        whileHover={{ scale: 1.2 }}
                     >
                        <img
                           src={item?.imgURL}
                           alt=""
                           className="w-full h-full object-contain"
                        />
                     </motion.div>
                     <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="w-8 h-8 rounded-full bg-red-500 flex items-center
              justify-center cursor-pointer hover:shadow-lg"
                        onClick={() => setItems([...items, item])}
                     >
                        <MdShoppingBasket className="text-white" />
                     </motion.div>
                  </div>
                  <div className="w-full flex flex-col items-end justify-end">
                     <p className="text-textColor font-semibold text-base md:text-lg">
                        {item?.title}
                     </p>
                     <p className="mt-1 text-sm text-gray-500">
                        {item?.calories} calories
                     </p>
                     <div className="flex items-center gap-8">
                        <p className="text-lg text-headingColor font-semibold">
                           <span className="text-sm text-red-500">$</span>
                           {item?.price}
                        </p>
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <div className="w-full flex flex-col items-center justify-center">
               <img src={NotFound} alt="" className="h-340" />
               <p className="text-xl text-headingColor font-semibold my-2">
                  This Items Is Not Available
               </p>
            </div>
         )}
      </div>
   );
};

export default RowContainer;
