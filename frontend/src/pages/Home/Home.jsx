import React from "react";
import styles from "./Home.module.css";
import { Link, useHistory } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
const Home = () => {
  const history = useHistory();
  function startRegister() {
    console.log("Register button clicked");
    history.push("/authenticate");
  }
  const signinStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to CodersHouse!" icon="logo">
        <p className={styles.text}>
          We are working hard to get CodeHouse ready for everyone! while we wrap
          up finishing vouches. We are adding people to make sure nothing
          breaks!
        </p>

        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>

        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
