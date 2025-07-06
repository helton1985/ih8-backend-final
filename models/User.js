const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nome é obrigatório'], trim: true },
  email: { type: String, required: [true, 'Email é obrigatório'], unique: true, lowercase: true, validate: [validator.isEmail, 'Por favor, forneça um email válido.'] },
  password: { type: String, required: [true, 'Senha é obrigatória'], minlength: 6, select: false },
  phone: { type: String, required: [true, 'Telefone é obrigatório'] },
  role: { type: String, enum: ['corretor', 'imobiliaria', 'construtora', 'admin'], default: 'corretor' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
