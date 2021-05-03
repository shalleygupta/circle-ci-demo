const fetch = require("cross-fetch").fetch

const FULL_ACCESS_API_KEY = "ffd35a12c12ad9223dfb0779a056ed"

const SUBMISSION_MODEL_ID = "610542"

const PRODUCT_SUBMISSION_BLOCK_ID = "610548"

module.exports.handleSubmission = async (
  event,
  productsPerBooth,
  { name, lastName, company, email, acceptsDataTerms }
) => {
  return await fetch("https://site-api.datocms.com/items", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FULL_ACCESS_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "item",
        attributes: {
          name,
          last_name: lastName,
          company,
          email,
          // link fields must get null if empty
          host: (event.host && event.host.id) || null,
          // strings need at least an empty string (non required ones)
          host_name: (event.host && event.host.name) || "",
          accepts_data_terms: acceptsDataTerms,
          event_name: event.name,
          event: event.id,
          customer_contacted: false,
          products: Object.keys(productsPerBooth)
            .filter(boothSlug => productsPerBooth[boothSlug].length > 0)
            .map(boothSlug => {
              const booth = event.booths.find(booth => booth.slug === boothSlug)
              if (!booth) throw "couldn't find booth with slug " + boothSlug
              return booth
            })
            .map(booth => {
              return productsPerBooth[booth.slug].map(productSlug => {
                const product = booth.products.find(p => p.slug === productSlug)
                if (!product)
                  throw (
                    "Couldn't find product " + productSlug + " in " + booth.slug
                  )

                return {
                  type: "item",
                  attributes: {
                    booth_name: booth.name,
                    booth: booth.id,
                    product: product.id,
                    product_name: product.name,
                  },
                  relationships: {
                    item_type: {
                      data: {
                        id: PRODUCT_SUBMISSION_BLOCK_ID,
                        type: "item_type",
                      },
                    },
                  },
                }
              })
            })
            .reduce((acc, curr) => [...acc, ...curr], []),
        },
        relationships: {
          item_type: {
            data: {
              type: "item_type",
              id: SUBMISSION_MODEL_ID,
            },
          },
        },
      },
    }),
  })
    .then(async res => {
      if (!res.ok) throw await res.json()
      return res.json()
    })
    .catch(e => {
      console.log(JSON.stringify(e, null, 2))
      throw e
    })
}
