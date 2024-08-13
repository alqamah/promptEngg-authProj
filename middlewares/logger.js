const fs = require('fs');
const path = require('path');

const errorLogger = (err, req, res, next) => {
  console.log('ERROR LOGGER \n', err); 
  const logFilePath = path.join(__dirname, '..', 'error.log');
  const errorLog = `${new Date().toISOString()} - ${err.stack}\n`;
  fs.appendFile(logFilePath, errorLog, (appendErr) => {
    if (appendErr) console.error('Error writing to log file:', appendErr);
  });
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
};

module.exports = errorLogger;