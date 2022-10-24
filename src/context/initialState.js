import { fletchCart, fletchUser } from "../utils/fletchLocalStorageData";
const userInfo = fletchUser();
const cartInfo = fletchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
