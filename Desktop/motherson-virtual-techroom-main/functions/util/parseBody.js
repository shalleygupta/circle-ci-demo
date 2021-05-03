module.exports = event => {
  if (event.isBase64Encoded) {
    return JSON.parse(Buffer.from(event.body, "base64").toString())
  } else {
    return JSON.parse(event.body)
  }
}
