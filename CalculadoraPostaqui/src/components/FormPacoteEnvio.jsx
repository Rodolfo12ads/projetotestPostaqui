import { useState } from "react";
import styles from "./FormPacoteEnvio.module.css";
//
function FormPacoteEnvio({ onSubmit }) {
  const [dados, setDados] = useState({
    peso: "",
    altura: "",
    largura: "",
    comprimento: "",
    valorDeclarado: "",
    quantidade: "",
    descricao: "",
    entregaReversa: false,
    avisoRecebimento: false,
    maosProprias: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Conversão simples dos campos numéricos para number (evita strings no backend)
    const dadosConvertidos = {
      ...dados,
      peso: Number(dados.peso),
      altura: Number(dados.altura),
      largura: Number(dados.largura),
      comprimento: Number(dados.comprimento),
      valorDeclarado: Number(dados.valorDeclarado),
      quantidade: Number(dados.quantidade),
    };

    onSubmit(dadosConvertidos);
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <h3>Dados do pacote de envio</h3>
      <div className={styles.grid}>
        <div>
          <label>Peso</label>
          <input name="peso" value={dados.peso} onChange={handleChange} required />
          <span className={styles.unidade}>gramas</span>

          <label>Altura</label>
          <input name="altura" value={dados.altura} onChange={handleChange} required />
          <span className={styles.unidade}>cm</span>

          <label>Largura</label>
          <input name="largura" value={dados.largura} onChange={handleChange} required />
          <span className={styles.unidade}>cm</span>

          <label>Comprimento</label>
          <input name="comprimento" value={dados.comprimento} onChange={handleChange} required />
          <span className={styles.unidade}>cm</span>
        </div>

        <div className={styles.switches}>
          <label>
            Logística Reversa
            <input type="checkbox" name="entregaReversa" checked={dados.entregaReversa} onChange={handleChange} />
          </label>
          <label>
            Aviso de recebimento
            <input type="checkbox" name="avisoRecebimento" checked={dados.avisoRecebimento} onChange={handleChange} />
          </label>
          <label>
            Mãos próprias
            <input type="checkbox" name="maosProprias" checked={dados.maosProprias} onChange={handleChange} />
          </label>

          <label>Valor da mercadoria</label>
          <input name="valorDeclarado" value={dados.valorDeclarado} onChange={handleChange} required />
          <span className={styles.unidade}>R$</span>

          <label>Quantidade de itens</label>
          <input name="quantidade" value={dados.quantidade} onChange={handleChange} required />
          <span className={styles.unidade}>Itens</span>
        </div>
      </div>

      <div className={styles.descricaoArea}>
        <label>Descrição dos itens</label>
        <textarea
          name="descricao"
          rows="4"
          value={dados.descricao}
          onChange={handleChange}
          maxLength={1000}
        />
        <div className={styles.contador}>Limite de letras {dados.descricao.length}/1000</div>
      </div>

      <button type="submit" className={styles.botao}>Avançar</button>
    </form>
  );
}

export default FormPacoteEnvio;
