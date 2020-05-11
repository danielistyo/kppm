const fs = require('fs')
const path = require('path')

const getConfig = () => {
  const message = fs.readFileSync(path.join(__dirname, '../config/message.txt')).toString()
  // .split('\n')

  const users = fs
    .readFileSync(path.join(__dirname, '../config/users.csv'))
    .toString()
    .split('\n')

  return {
    users,
    message,
  }
}

module.exports = {
  getConfig,
}
