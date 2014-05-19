// basis for this test is borrowed from
// https://github.com/feross/run-parallel/blob/master/test/array.js

var test = require('tape')

module.exports = function (basisify, name) {
  var exec = function (p, callback) {
        if (name === 'concurrentify')
          p.exec(2, callback)
        else
          p.exec(callback)
      }

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

    exec(p, function (err) {
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

    exec(p, function (err, results) {
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

    exec(p, function (err, results) {
      t.error(err)
      t.deepEqual(results, { two: 2 })
    })
  })

  if (name !== 'concurrentify')
    test(name + ' nested execution', function (t) {
      exec(
          basisify()
          .add(
            basisify.named()
              .add('foo', function (cb) {
                cb(null, 'bar')
              })
              .add('hello', function (cb) {
                cb(null, 'world')
              })
          )
          .add(
            basisify()
              .add(function (cb) {
                cb(null, 'one')
              })
              .add(function (cb) {
                cb(null, 'two')
              })
          )
        , function (err, data) {
          t.deepEqual(data, [{ foo: 'bar', hello: 'world' }, [ 'one', 'two' ]])
          t.end()
        }
      )
    })

  test(name + ' array input', function (t) {
    var p = basisify([
        function (cb) { cb (null, 'beep') }
      , function (cb) { cb (null, 'boop') }
    ])

    p.add(function (cb) { cb(null, 'woop') })
    exec(p, function (err, data) {
      t.deepEqual(data, [ 'beep', 'boop', 'woop' ])
      t.end()
    })
  })
}