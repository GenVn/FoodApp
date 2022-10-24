export const fletchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};

export const fletchCart = () => {
  const cartInfo =
    localStorage.getItem("cartItems") !== undefined
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();
  return cartInfo ? cartInfo : [];
};
