const express = require('express');
const router = express.Router();

// Exemplo de rota de webhook para PagSeguro
// No futuro, a lógica para processar o pagamento viria aqui.
router.post('/pagseguro', async (req, res) => {
    console.log('Webhook PagSeguro recebido:', req.body);
    res.status(200).send('OK');
});

module.exports = router;
