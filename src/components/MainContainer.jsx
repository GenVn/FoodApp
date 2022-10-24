import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useState } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setscrollValue] = useState();

  useEffect(() => {}, [scrollValue]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="flex w-full items-center justify-between ">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative 
          before:absolute before:rounded-lg before:content before:w-32 before:h-1
          before:-bottom-2 before:left-0 before:bg-orange-500 transition-all before:bg-gradient-to-tr
          from-orange-400 to-orange-600 ease-in-out duration-100"
          >
            Our Fresh & Healthy Fruits
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            flex items-center justify-center hover:shadow-lg"
              onClick={() => setscrollValue(-50)}
            >
              <MdChevronLeft className="text-white text-lg" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            flex items-center justify-center transition-all ease-in-out duration-100 hover:shadow-lg"
              onClick={() => setscrollValue(50)}
            >
              <MdChevronRight className="text-white text-lg" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruit")}
        />
      </section>
      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
