const { MEDIA_DATA_FRAGMENT } = require("./fragments")
const gql = require("@apollo/client").gql
const client = require("./client")

const query = gql`
  ${MEDIA_DATA_FRAGMENT}
  query getEvent($slug: String, $code: String) {
    allEvents(
      filter: {
        active: { eq: true }
        OR: [{ slug: { eq: $slug } }, { code: { eq: $code } }]
      }
    ) {
      id
      slug
      code
      name
      description
      host {
        name
        id
      }
      booths {
        id
        isActive
        slug
        name
        description
        posterVideo {
          ...MediaData
        }
        products {
          id
          isActive
          slug
          name
          useCustomThumbnail
          customThumbnail {
            ...MediaData
          }
          description
          attachments {
            __typename
            ... on ImageAttachmentRecord {
              image {
                ...MediaData
              }
            }
          }
        }
      }
      confidentialAccessCode
      confidentialAttachments {
        __typename
        ... on ConfidentialAttachmentRecord {
          product {
            id
          }
          image {
            ...MediaData
          }
        }
      }
    }
  }
`

module.exports = async (code, slug) =>
  client
    .query({
      query,
      variables: {
        code,
        slug,
      },
    })
    .catch(e => {
      console.log(e)
      throw { error: e, statusCode: 500 }
    })
