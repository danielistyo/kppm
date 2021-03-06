const SELECTORS = require('./selectors')

const clipboardy = require('clipboardy')

// Type mobile number
async function selectUser(page, userNumber) {
  await page.waitFor(SELECTORS.SEARCH_BOX)
  await page.type(SELECTORS.SEARCH_BOX, userNumber)
  await page.waitForSelector(SELECTORS.SEARCH_CLEAR_BUTTON)
  await page.keyboard.press('Enter')
  await page.waitFor(500)
}

async function typeMessage(page, messages, userName) {
  const message = await messages.replace('$name', userName)
  clipboardy.writeSync(message)
  await page.waitForSelector(SELECTORS.INPUT_MESSAGE_BOX)
  await page.type(SELECTORS.INPUT_MESSAGE_BOX, '')
  await page.keyboard.down('Control')
  await page.keyboard.press('KeyV')
  await page.keyboard.up('Control')

  // for (let message of messages) {
  //   message = await message.replace('$name', userName)
  //   await page.waitForSelector(SELECTORS.INPUT_MESSAGE_BOX)
  //   await page.type(SELECTORS.INPUT_MESSAGE_BOX, message)

  //   // add new line when messages have multiple line
  //   if (messages.length > 1) {
  //     await page.keyboard.down('Shift')
  //     await page.keyboard.press('Enter')
  //     await page.keyboard.up('Shift')
  //   }
  // }
  // // attach image
  // if (process.env.BROADCAST_IMAGE) {
  //   // paste image
  //   await page.keyboard.down('Control')
  //   await page.keyboard.press('KeyV')
  //   await page.keyboard.up('Control')
  //   await page.waitForSelector(SELECTORS.IMAGE_SEND_BUTTON)
  // }
  await page.keyboard.press('Enter')
  // await page.waitFor(800)
}

const sendMessages = async (page, config) => {
  console.time(`Time spent in sending ${config.users.length} messages`)

  for (const user of config.users) {
    await selectUser(page, user.number)
    await typeMessage(page, config.message, user.name)
  }
  console.timeEnd(`Time spent in sending ${config.users.length} messages`)
}

const listenNewMessage = async page => {
  const infiniteLoop = 0
  while (infiniteLoop > 1) {
    page.waitFor(2000) // wait 2s
  }
}

module.exports = {
  sendMessages,
  listenNewMessage,
}
