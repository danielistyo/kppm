const SELECTORS = require('./selectors')

// Type mobile number
async function selectUser(page, userNumber) {
  await page.waitFor(SELECTORS.SEARCH_BOX)
  await page.type(SELECTORS.SEARCH_BOX, userNumber)
  await page.keyboard.press('Enter')
}

async function typeMessage(page, messages, userName) {
  for (let message of messages) {
    message = await message.replace('$name', userName)
    await page.waitForSelector(SELECTORS.INPUT_MESSAGE_BOX)
    await page.type(SELECTORS.INPUT_MESSAGE_BOX, message)

    if (messages.length > 1) {
      await page.keyboard.down('Shift')
      await page.keyboard.press('Enter')
      await page.keyboard.up('Shift')
    }
  }
  await page.keyboard.press('Enter')
}

const sendMessages = async (page, config) => {
  console.time(`Time spent in sending ${config.numbers.length} messages`)

  for (const user of config.numbers) {
    if (!user || user.includes('//')) {
      continue
    }
    const [userName, userNumber, description] = await user.split(',')
    await selectUser(page, userNumber)
    await typeMessage(page, config.message, userName)
  }
  console.timeEnd(`Time spent in sending ${config.numbers.length} messages`)
}

module.exports = {
  sendMessages,
}
