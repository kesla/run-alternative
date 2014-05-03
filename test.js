var alternative = require('./alternative')
  , test = require('./abstract-test')

test(require('run-parallel'), 'parallelify')
test(require('run-series'), 'seriesify')