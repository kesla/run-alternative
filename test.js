var alternative = require('./alternative')
  , test = require('./abstract-test')

test(alternative(require('run-parallel')), 'parallelify')
test(alternative(require('run-series')), 'seriesify')
test(alternative(require('run-concurrent')), 'concurrentify')