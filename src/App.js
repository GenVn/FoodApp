import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { MainContainer, CreateContainer } from "./components";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";

const App = () => {
   // eslint-disable-next-line no-empty-pattern
   const [{}, dispatch] = useStateValue();
   const fletchData = async () => {
      await getAllFoodItems().then((data) => {
         dispatch({
            type: actionType.SET_FOOD_ITEMS,
            foodItems: data,
         });
      });
   };

   useEffect(() => {
      fletchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <AnimatePresence exitBeforeEnter>
         <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />

            <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full">
               <Routes>
                  <Route path="/" element={<MainContainer />} />
                  <Route path="/createItem" element={<CreateContainer />} />
               </Routes>
            </main>
         </div>
      </AnimatePresence>
   );
};

export default App;
