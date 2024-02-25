import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    email: null,
    password: null,
  },

  isLogin: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, userInfo: action.payload, isLogin: true };
    case "signup":
      return { ...state, isLogin: false };
    case "logout":
      return { ...state, isLogin: false, userInfo: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    user: loginReducer,
  },
});

export default store;
