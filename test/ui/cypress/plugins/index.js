module.exports = (on, config) => {
  on('task', {
    ...require('./tasks')
  })
}
