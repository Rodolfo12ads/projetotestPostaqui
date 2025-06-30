const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Instale: npm install node-fetch
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Rota de teste
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// ✅ Rota para salvar pedido e simular frete
app.post("/api/pedido", async (req, res) => {
  try {
    const { sender, receiver, package: pacote } = req.body;

    if (!sender || !receiver || !pacote) {
      return res.status(400).json({ error: "Dados incompletos na requisição." });
    }

    const respostaFrete = await fetch("https://f29faec4-6487-4b60-882f-383b4054cc32.mock.pstmn.io/shipping_calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, receiver, package: pacote })
    });

    if (!respostaFrete.ok) {
      const erro = await respostaFrete.text();
      console.error("Erro da API externa:", erro);
      return res.status(502).json({ error: "Erro na simulação de frete", detalhe: erro });
    }

    const resultado = await respostaFrete.json();

    const novoPedido = await prisma.pedidoEnvio.create({
      data: {
        sender,
        receiver,
        package: pacote,
        frete: resultado.shipment
      }
    });

    res.status(201).json({
      message: "Pedido salvo com sucesso!",
      frete: resultado.shipment,
      pedido: novoPedido
    });

  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ error: "Erro ao salvar pedido ou calcular frete", detalhe: error.message });
  }
});

// ✅ Buscar um pedido por ID
app.get("/api/pedido/:id", async (req, res) => {
  try {
    const pedido = await prisma.pedidoEnvio.findUnique({
      where: { id: req.params.id }
    });

    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

    res.json(pedido);
  } catch (err) {
    console.error("Erro ao buscar pedido:", err);
    res.status(500).json({ error: "Erro interno ao buscar pedido" });
  }
});

// ✅ Escolher frete e gerar código de rastreio
app.put("/api/pedido/:id/escolher", async (req, res) => {
  try {
    const { escolhido } = req.body;
    const { id } = req.params;

    if (!escolhido || !escolhido._id || !escolhido.carrier) {
      return res.status(400).json({ error: "Dados do frete escolhido são inválidos." });
    }

    // Gerar código de rastreio
    const carrier = escolhido.carrier.toUpperCase().replace(" ", "_");
    const resposta = await fetch(`https://f29faec4-6487-4b60-882f-383b4054cc32.mock.pstmn.io/posting?carrier=${carrier}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calculated_id: escolhido._id })
    });

    const resultado = await resposta.json();

    // Atualizar o pedido no banco
    const atualizado = await prisma.pedidoEnvio.update({
      where: { id },
      data: {
        escolhido,
        rastreio: resultado.code
      }
    });

    res.status(200).json({
      message: "Frete confirmado!",
      codigoRastreio: resultado.code,
      pedidoAtualizado: atualizado
    });

  } catch (error) {
    console.error("Erro ao confirmar o frete:", error);
    res.status(500).json({ error: "Erro ao confirmar o frete", detalhe: error.message });
  }
});

// ✅ Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
