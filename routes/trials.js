const express = require('express');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Trial = require('../models/Trial');
const router = express.Router();
const crypto = require('crypto');

// Rota para ativar um Free Trial
router.post('/activate', async (req, res, next) => {
  try {
    const { name, email, phone, segment } = req.body;

    // Lógica para determinar o plano de trial baseado no segmento
    let planId;
    if (segment === 'corretor') planId = 'corretor-autonomo';
    else if (segment === 'imobiliaria') planId = 'imobiliaria-5';
    else if (segment === 'construtora') planId = 'construtora-10';
    else return res.status(400).json({ message: 'Segmento inválido.' });

    const plan = await Plan.findOne({ planId: planId });
    if (!plan) {
        return res.status(404).json({ message: 'Plano de trial não encontrado.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Usuário com este email já existe.' });
    }

    const tempPassword = crypto.randomBytes(8).toString('hex');
    const user = new User({ name, email, phone, role: segment, password: tempPassword, plan: plan._id });
    await user.save();

    const trial = new Trial({ user: user._id, plan: plan._id });
    await trial.save();

    // No futuro, aqui você chamaria os serviços de email e WhatsApp
    // emailService.sendWelcomeEmail(user, tempPassword);
    // whatsappService.sendWelcomeMessage(user);

    res.status(201).json({ message: 'Trial ativado com sucesso! Verifique seu email para a senha de acesso.' });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
