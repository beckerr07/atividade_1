import { Router } from "express";
import equipamentosService from "../services/equipamentos.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const equipamentos = await equipamentosService.listarTodos();

        return res.status(200).json(equipamentos);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao listar equipamentos"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const equipamento = await equipamentosService.buscarPorId(
            req.params.id
        );

        if (!equipamento) {
            return res.status(404).json({
                mensagem: "Equipamento não encontrado"
            });
        }

        return res.status(200).json(equipamento);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao buscar equipamento"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nome, categoria, condicao, disponivel } = req.body;

        const equipamento = await equipamentosService.cadastrar(
            nome,
            categoria,
            condicao,
            disponivel
        );

        return res.status(201).json(equipamento);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar equipamento"
        });
    }
});

router.patch("/:id/disponibilidade", async (req, res) => {
    try {
        const { disponivel } = req.body;

        const equipamento =
            await equipamentosService.alterarDisponibilidade(
                req.params.id,
                disponivel
            );

        if (!equipamento) {
            return res.status(404).json({
                mensagem: "Equipamento não encontrado"
            });
        }

        return res.status(200).json(equipamento);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao alterar disponibilidade"
        });
    }
});

export default router;