//crie o conteudo deste arquivo vendaController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, quantidade, produto_id

const Venda = require('../models/vendaModel');
const User = require('../models/userModel');
const Produto = require('../models/produtoModel');

const vendaController = {
    createVenda: (req, res) => {
        const newVenda = {
            quantidade: req.body.quantidade,
            valor: req.body.valor,
            data_venda: req.body.data_venda,
            user: req.body.user,
            produto: req.body.produto,
        };

        Venda.createVenda(newVenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/show', { venda });
        });
    },

    getAllVendas: (req, res) => {
        Venda.getAllVendas((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/index', { vendas });
        });
    },

    renderCreateForm: (req, res) => {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Produto.getAll((err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/create', { users, produtos });
            });
        });
        

       
    },

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/edit', { venda });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            quantidade: req.body.quantidade,
            valor: req.body.valor,
            data_venda: req.body.data_venda,
            user: req.body.user_id,
            produto: req.body.produto_id,
        };

        Venda.update(vendaId, updatedVenda, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.deleteVenda(vendaId, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    }
};



module.exports = vendaController;