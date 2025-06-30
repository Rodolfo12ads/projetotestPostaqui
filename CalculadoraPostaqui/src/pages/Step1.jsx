import Forms from "../components/Forms";
import Frase from "../components/Frase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/Logo";

function Step1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '', cpf: '', telefone: '', email: '', cep: '',
    estado: '', cidade: '', bairro: '', rua: '', numero: '', complemento: ''
  });

  const handleNext = () => {
    navigate("/step2", { state: formData });
  };

  return (
    <>
    <Logo/>
    <Frase texto="Origem"/>
    <Forms formData={formData} setFormData={setFormData} onNext={handleNext} />

     </>
  );
   
    
}

export default Step1;
