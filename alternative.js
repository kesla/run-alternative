module.exports = function (run) {
  var parallelify = function () {
        var tasks = []

        return {
            add: function (fun) {
              tasks.push(fun)
              return this
            }
          , exec: function (callback) {
              run(tasks, callback)
            }
        }
      }

  parallelify.named = function () {
    var tasks = []
      , names = []

    return {
        add: function (name, fun) {
          if (!fun) {
            fun = name
            name = undefined
          }

          names.push(name)
          tasks.push(fun)
          return this
        }
      , exec: function (callback) {
          run(tasks, function (err, array) {
            if (err) return callback(err)

            var result = {}

            array.forEach(function (data, i) {
              if (names[i])
                result[names[i]] = data
            })

            callback(null, result)
          })
        }
    }
  }

  return parallelify
}