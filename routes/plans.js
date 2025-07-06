const express = require('express');
const Plan = require('../models/Plan');
const router = express.Router();

// Rota para listar todos os planos
router.get('/', async (req, res, next) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    res.status(200).json(plans);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
