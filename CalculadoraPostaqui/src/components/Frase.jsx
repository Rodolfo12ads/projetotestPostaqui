import styles from "./Frase.module.css";

function Frase({ texto }) {
  return <h2 className={styles.frase}>{texto}</h2>;
}

export default Frase;
