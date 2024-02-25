export const Login = (userInfo) => ({
  type: "login",
  payload: userInfo,
});

export const Signup = () => ({
  type: "signup",
});

export const Logout = () => ({
  type: "logout",
  payload: {},
});
