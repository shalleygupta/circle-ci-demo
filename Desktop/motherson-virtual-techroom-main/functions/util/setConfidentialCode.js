const fetch = require("cross-fetch").fetch

const FULL_ACCESS_API_KEY = "ffd35a12c12ad9223dfb0779a056ed"

const { performance } = require("perf_hooks")

function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime() //Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}

module.exports.setConfidentialCode = async itemId => {
  return await fetch(`https://site-api.datocms.com/items/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${FULL_ACCESS_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "item",
        id: itemId,
        attributes: {
          confidential_access_code: generateUUID(),
        },
      },
    }),
  }).then(res => {
    if (res.ok) return res.json()
    throw res.error()
  })
}
