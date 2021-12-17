import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import apiHelper from "../apiHelper/apiHelper";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const jwt_string = "jwttime2donate";
  const [loggedIn, setLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    checkedLogged();
    getAllUsers();
  }, []);

  useEffect(() => {
    // revalidateToken();
  }, [loggedIn]);

  const getAllUsers = async (user) => {
    const response = await apiHelper.get("/auth");
    setUsers(response.data);
  };

  const checkedLogged = () => {
    const tokenValue = JSON.parse(localStorage.getItem(jwt_string));
    return tokenValue ? setLoggedIn(true) : setLoggedIn(false);
  };

  const setLocalStorageToken = (data) => {
    localStorage.setItem(jwt_string, JSON.stringify(data));
  };

  const logInUser = async (obj) => {
    try {
      const response = await apiHelper.post("/auth/login", obj);
      const { data } = response;
      setUser(data.user);
      setLocalStorageToken(data);
      setLoggedIn(true);
      toast.success("Successfully Logged In");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const signUpUser = async (obj) => {
    const response = await apiHelper.post("/auth/signup", obj);
    if (response.data) {
      setLocalStorageToken(response.data);
      toast.success("Signed up & Logged in");
      setLoggedIn(true);
      setUser({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };

  const revalidateToken = async () => {
    if (!loggedIn) return;
    try {
      const response = await apiHelper.post("/auth/renew");
      const { data } = response;
      setUser(data.user);
      setLocalStorageToken(data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async (obj) => {
    try {
      const response = await apiHelper.post("/auth/googleLogin", obj);
      const { user, token } = response.data;
      localStorage.setItem(
        "jwtreservespot",
        JSON.stringify({ user_role: user.role, token: token })
      );
      setLoggedIn(true);
      toast.success("Successfuly Logged In with Google");
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem(jwt_string);
    toast.warning("Successfully Logged out");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        logInUser,
        logOutUser,
        signUpUser,
        googleLogin,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
