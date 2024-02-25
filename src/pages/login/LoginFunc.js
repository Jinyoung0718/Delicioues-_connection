import store from "../../redux/redux";
import { Login, Signup, Logout } from "../login/LoginAction";

export const LoginWithUserInfo = (userInfo) => {
  store.dispatch(Login(userInfo));
};

export const LogoutWithUserInfo = () => {
  store.dispatch(Logout());
};

export const SignupFunc = () => {
  store.dispatch(Signup());
};
