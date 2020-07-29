git statuconst dict = require('spanish-dict-client');

dict.translate('ser')
  .then(console.log)
  .catch(console.log);

