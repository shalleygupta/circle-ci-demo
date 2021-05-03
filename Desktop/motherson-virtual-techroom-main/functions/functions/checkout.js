const parseBody = require("../util/parseBody")
const { isOptions, dealWithOptions } = require("../util/options")
const eventsQuery = require("../queries/event")
const { handleSubmission } = require("../util/handleSubmission")

module.exports.handler = async event => {
  if (isOptions(event, "POST")) {
    return dealWithOptions(event, "POST")
  }
  const { event: body, products, ...contactDetails } = parseBody(event)

  if (!body.slug) return { statusCode: 400 }

  return await eventsQuery(event.code, body.slug)
    .then(({ data: { allEvents } }) =>
      allEvents.find(e => e.slug === body.slug)
    )
    .then(async eventDetails => {
      return await handleSubmission(eventDetails, products, contactDetails)
        .then(() => ({
          statusCode: 200,
          body: "{}",
        }))
        .catch(error => ({ statusCode: 500, body: JSON.stringify({ error }) }))
    })
}
