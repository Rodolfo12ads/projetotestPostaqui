// ResumoOrigemDestino.jsx
import styles from "./ResumoOrigem.module.css";

function ResumoOrigem({ origem, destino }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.origem}`}>
        <h3>Origem</h3>
        <p>{origem.nome} - {origem.cpf}</p>
        <p>{origem.cep}, {origem.estado}, {origem.cidade}</p>
        <p>{origem.bairro}, {origem.rua}, {origem.numero}</p>
        {origem.complemento && <p>Comp: {origem.complemento}</p>}
      </div>

    </div>
  );
}

export default ResumoOrigem;
