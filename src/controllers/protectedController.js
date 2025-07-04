const getSecretData = (req, res) => {
  res.status(200).json({
    message: 'This is protected data',
    user: req.user, // comes from middleware
  });
};

module.exports = {
  getSecretData,
};
