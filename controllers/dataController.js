exports.getProtectedResource = (req, res) => {
  console.log('Protected resource accessed'); 
  res.status(200).json({ msg: 'Protected resource accessed' });
};