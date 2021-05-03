const { gql } = require("@apollo/client")

module.exports.MEDIA_DATA_FRAGMENT = gql`
  fragment MediaData on FileField {
    alt
    title
    url
    mimeType
    format
    height
    width
    filename
    video {
      duration
      framerate
      mp4Url
      thumbnailUrl
    }
    responsiveImage(imgixParams: { auto: compress }) {
      alt
      bgColor
      src
      srcSet
      webpSrcSet
      webpSrcSet
      sizes
      aspectRatio
      width
      height
      title
    }
  }
`
