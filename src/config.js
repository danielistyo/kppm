const fs = require('fs')
const path = require('path')
const Parse = require('parse/node')

Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY, process.env.MASTER_KEY)

const getConfig = async () => {
  const message = fs.readFileSync(path.join(__dirname, '../config/message.txt')).toString()

  const recipients = Parse.Object.extend('recipients')
  const query = new Parse.Query(recipients)
  query.equalTo('active', true)
  let users = []
  try {
    users = await (await query.find()).map(user => ({
      number: user.get('number'),
      name: user.get('name'),
    }))
  } catch (e) {
    users = []
  }

  return {
    users,
    message,
  }
}

module.exports = {
  getConfig,
}
