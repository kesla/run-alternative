module.exports = function (run) {
  var parallelify = function (tasks) {
        var exec = function (callback) {
              run(tasks, callback)
            }

        tasks = tasks || []

        exec.add = function (fun) {
          tasks.push(fun)
          return this
        }

        exec.exec = exec

        return exec
      }

  parallelify.named = function () {
    var tasks = []
      , names = []
      , exec = function (callback) {
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

    exec.add = function (name, fun) {
      if (!fun) {
        fun = name
        name = undefined
      }

      names.push(name)
      tasks.push(fun)
      return this
    }

    exec.exec = exec

    return exec
  }

  return parallelify
}