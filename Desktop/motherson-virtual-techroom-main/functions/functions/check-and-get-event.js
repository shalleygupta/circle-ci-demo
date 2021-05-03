const parseBody = require("../util/parseBody")
const { isOptions, dealWithOptions } = require("../util/options")
const eventsQuery = require("../queries/event")
const { parseEvent } = require("../util/parseEvent")
const {
  mergeConfidentialAttachments,
} = require("../util/mergeConfidentialAttachments")

module.exports.handler = async event => {
  if (isOptions(event, "POST")) {
    return dealWithOptions(event, "POST")
  }
  const body = parseBody(event)

  if (!body.code && !body.slug) {
    return {
      statusCode: 400,
    }
  }

  return await eventsQuery(body.code, body.slug)
    .then(({ data: { allEvents } }) => {
      if (body.confidentialCode) {
        // User specified confidential code: check everything and merge attachments
        const event = allEvents.find(
          e => e.confidentialAccessCode === body.confidentialCode
        )
        if (!event || event.code !== body.code)
          throw { error: "Not found", statusCode: 400 }

        return mergeConfidentialAttachments(event)
      }
      if (body.slug) {
        // User specified slug: check if matching event is public OR code matches
        const event = allEvents.find(e => e.slug === body.slug)
        if (!event || (!!event.code && event.code !== body.code))
          throw { error: "not found or wrong code", statusCode: 400 }

        if (event) return event
      }
      if (body.code) {
        // User specified code, find by code and check
        const event = allEvents.find(e => e.code === body.code)
        if (!event) throw { error: "Wrong code", statusCode: 400 }
        return event
      }
      return {}
    })
    .then(event => ({
      statusCode: 200,
      body: JSON.stringify(parseEvent(event)),
    }))
    .catch(
      error =>
        console.log(error) || {
          statusCode: error.statusCode || 500,
          body: JSON.stringify(error),
        }
    )
}
