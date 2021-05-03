const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

exports.isOptions = (event, allowedMethod) => event.httpMethod !== allowedMethod

exports.dealWithOptions = (event, allowedMethod) => {
  if (event.httpMethod !== allowedMethod) {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": `${allowedMethod}`,
      },
    }
  }
}

exports.corsHeaders = corsHeaders
