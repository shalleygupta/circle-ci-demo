const parseBody = require("../util/parseBody")
const { isOptions, dealWithOptions } = require("../util/options")
const { setConfidentialCode } = require("../util/setConfidentialCode")

module.exports.handler = async event => {
  if (isOptions(event, "POST")) {
    return dealWithOptions(event, "POST")
  }
  const { entity_id } = parseBody(event)
  if (!entity_id)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Couldn't parse entity ID." }),
    }

  await setConfidentialCode(entity_id).then(e => console.log(e))

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  }
}
