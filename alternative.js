module.exports = function (run) {
  var base = function (tasks) {
        var exec = function (limit, callback) {
              if (typeof(limit) === 'function')
                run(tasks, limit)
              else
                run(limit, tasks, callback)
            }

        tasks = tasks || []

        exec.add = function (fun) {
          tasks.push(fun)
          return this
        }

        exec.exec = exec

        return exec
      }

  base.named = function () {
    var tasks = []
      , names = []
      , exec = function (limit, callback) {
          var done = function (err, array) {
                if (err) return callback(err)

                var result = {}

                array.forEach(function (data, i) {
                  if (names[i])
                    result[names[i]] = data
                })

                callback(null, result)
              }

          if (typeof(limit) === 'function'){
            callback = limit
            run(tasks, done)
          } else {
            run(limit, tasks, done)
          }

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

  return base
}