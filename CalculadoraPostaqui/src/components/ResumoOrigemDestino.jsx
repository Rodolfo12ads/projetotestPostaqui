// ResumoOrigemDestino.jsx
import styles from "./ResumoOrigemDestino.module.css";

function ResumoOrigemDestino({ origem, destino }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.origem}`}>
        <h3>Origem</h3>
        <p>{origem.nome} - {origem.cpf}</p>
        <p>{origem.cep}, {origem.estado}, {origem.cidade}</p>
        <p>{origem.bairro}, {origem.rua}, {origem.numero}</p>
        {origem.complemento && <p>Comp: {origem.complemento}</p>}
      </div>

      <div className={styles.arrow}>
        <span>→</span>
      </div>

      <div className={`${styles.card} ${styles.destino}`}>
        <h3>Destino</h3>
        <p>{destino.nome} - {destino.cpf}</p>
        <p>{destino.cep}, {destino.estado}, {destino.cidade}</p>
        <p>{destino.bairro}, {destino.rua}, {destino.numero}</p>
        {destino.complemento && <p>Comp: {destino.complemento}</p>}
      </div>
    </div>
  );
}

export default ResumoOrigemDestino;
