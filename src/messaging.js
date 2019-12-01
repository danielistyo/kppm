const SELECTORS = require('./selectors')

// Type mobile number
async function selectUser(page, userNumber) {
  await page.waitFor(SELECTORS.SEARCH_BOX)
  await page.type(SELECTORS.SEARCH_BOX, userNumber)
  await page.keyboard.press('Enter')
  await page.waitFor(500)
}

async function typeMessage(page, messages, userName) {
  for (let message of messages) {
    message = await message.replace('$name', userName)
    await page.waitForSelector(SELECTORS.INPUT_MESSAGE_BOX)
    await page.type(SELECTORS.INPUT_MESSAGE_BOX, message)

    // add new line when messages have multiple line
    if (messages.length > 1) {
      await page.keyboard.down('Shift')
      await page.keyboard.press('Enter')
      await page.keyboard.up('Shift')
    }
  }
  // attach image
  if (process.env.BROADCAST_IMAGE) {
    // paste image
    await page.keyboard.down('Control')
    await page.keyboard.press('KeyV')
    await page.keyboard.up('Control')
    await page.waitForSelector(SELECTORS.IMAGE_SEND_BUTTON)
  }
  await page.keyboard.press('Enter')
  // await page.waitFor(800)
}

const sendMessages = async (page, config) => {
  console.time(`Time spent in sending ${config.users.length} messages`)

  for (const user of config.users) {
    /* eslint-disable-next-line no-unused-vars */
    const [active, userName, userNumber, description] = await user.split(',')
    // // skip inactive user
    if (!parseInt(active, 10) || active === 'Active') {
      continue
    }
    await selectUser(page, userNumber)
    await typeMessage(page, config.message, userName)
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
