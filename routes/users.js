const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Rota para buscar dados do usuário logado
router.get('/me', auth, async (req, res, next) => {
  try {
    // req.user foi adicionado pelo middleware de autenticação
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
