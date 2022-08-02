import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import { setAuth, setOtp } from "../../../store/authSlice";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };

  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.auth)

  async function logoutUser() {
    try {
      const { data } = await logout()
      dispatch(setAuth(data))

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="Logo" />
        <span style={logoText}>CodersHouse</span>
      </Link>

      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;


