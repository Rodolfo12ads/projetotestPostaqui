// Step2.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Frase from "../components/Frase";
import Forms from "../components/Forms";
import styles from "./Step2.module.css";
import Logo from "../components/Logo";
import ResumoOrigem from "../components/ResumoOrigem";

function Step2() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(location.state || {});

  const handleNext = () => {
    navigate("/step3", { state: formData });
  };

  const origemData = {
    nome: formData.nome,
    cpf: formData.cpf,
    cep: formData.cep,
    estado: formData.estado,
    cidade: formData.cidade,
    bairro: formData.bairro,
    rua: formData.rua,
    numero: formData.numero,
    complemento: formData.complemento,
  };

  return (
    <div className={styles.page}>
      <Logo />
      <h2 className={styles.title}>Origem</h2>

      <ResumoOrigem origem={origemData} />

      <Frase texto="Destino" />
      <Forms formData={formData} setFormData={setFormData} onNext={handleNext} prefix="Destino" />

    </div>
  );
}

export default Step2;
