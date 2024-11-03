const BASE_URL = process.env.API_URL

export const sendMail = async (
  mail: string,
  title: string,
  message: string
) => {
  const url = BASE_URL + '/email/sendMessage'

  const body = {
    toUser: mail,
    subject: title,
    message: message,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.text()
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
