import logo from "../assets/logo.svg";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Logo Postaqui" className={styles.logo} />
    </div>
  );
}

export default Logo;
