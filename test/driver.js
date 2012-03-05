
var Driver = require('mocha-ci-driver').Driver
  , driver = new Driver(__dirname+'/../', 8888)

driver.run('/test/index.html', 'Spec');
