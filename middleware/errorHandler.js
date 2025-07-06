module.exports = (err, req, res, next) => {
  console.error('❌ Erro:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Ocorreu um erro interno no servidor.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
