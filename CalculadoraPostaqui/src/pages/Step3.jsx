import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Step3.module.css";
import Logo from "../components/Logo";
import Frase from "../components/Frase";
import ResumoOrigemDestino from "../components/ResumoOrigemDestino";
import FormPacoteEnvio from "../components/FormPacoteEnvio";

function Step3() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state || {});

  const handleSubmitPacote = async (pacoteData) => {
    const dadosCompletos = { ...formData, ...pacoteData };

    const payload = {
      sender: {
        fullname: formData.nome,
        cpf: formData.cpf,
        phone: formData.telefone,
        email: formData.email,
        address: {
          cep: formData.cep,
          state: formData.estado,
          uf: formData.estado,
          city: formData.cidade,
          neighborhood: formData.bairro,
          street: formData.rua,
          number: formData.numero,
          complement: formData.complemento
        }
      },
      receiver: {
        fullname: formData.nomeDestino,
        cpf: formData.cpfDestino,
        phone: formData.telefoneDestino,
        email: formData.emailDestino,
        address: {
          cep: formData.cepDestino,
          state: formData.estadoDestino,
          uf: formData.estadoDestino,
          city: formData.cidadeDestino,
          neighborhood: formData.bairroDestino,
          street: formData.ruaDestino,
          number: formData.numeroDestino,
          complement: formData.complementoDestino
        }
      },
      package: {
        weight: pacoteData.peso,
        height: pacoteData.altura,
        width: pacoteData.largura,
        length: pacoteData.comprimento,
        reverse: pacoteData.logisticaReversa || false,
        ar: pacoteData.avisoRecebimento || false,
        own_hands: pacoteData.maosProprias || false,
        information: {
          amount: pacoteData.valor,
          quantity: pacoteData.quantidade,
          description: pacoteData.descricao
        }
      }
    };

    try {
      const response = await fetch("http://localhost:3001/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resultado = await response.json();

      console.log("Resultado da API:", resultado);

      if (!resultado?.frete || !resultado?.pedido) {
        alert("Erro: A resposta da API está incompleta.");
        return;
      }

      navigate("/step4", {
        state: {
          frete: resultado.frete,
          pedido: resultado.pedido
        }
      });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao processar o pedido.");
    }
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
    complemento: formData.complemento
  };

  const destinoData = {
    nome: formData.nomeDestino,
    cpf: formData.cpfDestino,
    cep: formData.cepDestino,
    estado: formData.estadoDestino,
    cidade: formData.cidadeDestino,
    bairro: formData.bairroDestino,
    rua: formData.ruaDestino,
    numero: formData.numeroDestino,
    complemento: formData.complementoDestino
  };

  return (
    <div className={styles.page}>
      <Logo />
      <Frase texto="Teste Calculadora Postaqui" />
      <ResumoOrigemDestino origem={origemData} destino={destinoData} />
      <FormPacoteEnvio onSubmit={handleSubmitPacote} />
    </div>
  );
}

export default Step3;
