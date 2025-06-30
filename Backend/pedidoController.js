import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST /api/pedido
export const criarPedido = async (req, res) => {
  try {
    const novo = await prisma.pedidoEnvio.create({
      data: {
        sender: req.body.sender,
        receiver: req.body.receiver,
        package: req.body.package
      }
    });

    // Simula retorno da API de frete (como se tivesse chamado outra API)
    const freteSimulado = [
      { _id: "1", carrier: "Correios Pac", price: 10.50, discount: 2.00 },
      { _id: "2", carrier: "Sedex", price: 18.90, discount: 3.50 }
    ];

    res.json({ pedidoId: novo.id, frete: freteSimulado });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ erro: "Erro ao salvar pedido" });
  }
};

// GET /api/pedido/:id
export const getPedidoPorId = async (req, res) => {
  try {
    const pedido = await prisma.pedidoEnvio.findUnique({
      where: { id: req.params.id }
    });

    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
    res.json(pedido);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ erro: "Erro ao buscar pedido" });
  }
};

// PUT /api/pedido/:id/escolher
export const escolherFrete = async (req, res) => {
  try {
    const pedido = await prisma.pedidoEnvio.update({
      where: { id: req.params.id },
      data: { escolhido: req.body.escolhido }
    });

    res.json({ mensagem: "Frete escolhido salvo", pedido });
  } catch (error) {
    console.error("Erro ao escolher frete:", error);
    res.status(500).json({ erro: "Erro ao salvar frete escolhido" });
  }
};
