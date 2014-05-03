// basis for this test is borrowed from
// https://github.com/feross/run-parallel/blob/master/test/array.js

var test = require('tape')

module.exports = function (basisify, name) {
  test(name + ' basic', function (t) {
    t.plan(4)

    var p = basisify()

    p.add(function (cb) {
      t.pass('cb 1')
      cb(null)
    })

    p.add(function (cb) {
      t.pass('cb 2')
      cb(null)
    })

    p.add(function (cb) {
      t.pass('cb 3')
      cb(null)
    })

    p.exec(function (err) {
      t.error(err)
    })
  })

  test(name + ' functions that return results', function (t) {
    t.plan(4)

    var p = basisify()

    p.add(function (cb) {
      t.pass('cb 1')
      cb(null, 1)
    })

    p.add(function (cb) {
      t.pass('cb 2')
      cb(null, 2)
    })

    p.exec(function (err, results) {
      t.error(err)
      t.deepEqual(results, [1, 2])
    })
  })

  test(name + ' named functions that return results', function (t) {
    t.plan(4)

    var p = basisify.named()

    p.add(function (cb) {
      t.pass('cb 1')
      cb(null, 1)
    })

    p.add('two', function (cb) {
      t.pass('cb 2')
      cb(null, 2)
    })

    p.exec(function (err, results) {
      t.error(err)
      t.deepEqual(results, { two: 2 })
    })
  })
}