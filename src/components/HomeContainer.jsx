import Delivery from "../assests/img/delivery.png";
import HeroBG from "../assests/img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
   return (
      <section
         className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
         id="home"
      >
         <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
            <div className="flex items-center gap-2 justify-center bg-orange-200 px-4 py-1 rounded-full">
               <p className="text-base text-orange-500 font-semibold">
                  Bike Delivery
               </p>
               <div className="w-7 h-7 bg-white rounded-full overflow-hidden drop-shadow-xl">
                  <img
                     src={Delivery}
                     alt="delivery"
                     className="w-full h-full object-contain"
                  />
               </div>
            </div>

            <p className="text-[2.2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
               The Fastest Delivery in{" "}
               <span className="text-orange-500 text-[2.7rem] lg:text-[4.5rem]">
                  Ho Chi Minh City
               </span>
            </p>

            <p
               className="text-base text-textColor text-center 
          md:text-left md:w-4/5 md:text-"
            >
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
               architecto tenetur fugit, incidunt voluptate temporibus
               aspernatur provident totam eius quo, animi excepturi facilis
               expedita maiores numquam blanditiis adipisci asperiores delectus!
            </p>

            <button
               type="button"
               className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-2xl 
          hover:shadow-lg md:w-auto
          transition-all ease-in-out duration-100"
            >
               Order Now
            </button>
         </div>
         <div className="py-2 flex-1 flex items-center relative">
            <img
               src={HeroBG}
               alt="herobg"
               className="lg:h-650 ml-auto h-420 w-full lg:w-auto "
            />
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-16 py-8 gap-4 flex-wrap mt-3">
               {heroData &&
                  heroData.map((n) => (
                     <div
                        key={n.id}
                        className="lg:w-190 flex-wrap p-2 bg-cardOverlay backdrop-blur-md flex flex-col items-center justify-center rounded-3xl drop-shadow-lg"
                     >
                        <div className="w-20 h-20 lg:h-40 lg:w-40 lg:-mt-20 -mt-10">
                           <img
                              src={n.imgSrc}
                              alt="I1"
                              className="h-full w-full object-contain "
                           />
                        </div>
                        <p className="lg:text-xl text-base font-semibold text-textColor mt-2 lg:mt-4">
                           {n.name}
                        </p>
                        <p className="text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3 ">
                           {n.desc}
                        </p>
                        <p className="text-sm font-semibold text-headingColor">
                           <span className="text-xs text-red-600">$</span>{" "}
                           {n.price}
                        </p>
                     </div>
                  ))}
            </div>
         </div>
      </section>
   );
};

export default HomeContainer;
