const parseDatoCmsAsset = asset =>
  asset
    ? {
        ...asset,
        responsiveImage: asset.responsiveImage
          ? {
              ...asset.responsiveImage,
              webpSrcSet: undefined,
              srcSetWebp: asset.responsiveImage.webpSrcSet,
            }
          : undefined,
      }
    : {}

const parseAttachment = at => ({
  visibility: at.visibility || "default",
  ...parseDatoCmsAsset(at.image),
})

const parseProduct = (p, parentBooth) => ({
  slug: p.slug,
  parentBoothSlug: (parentBooth && parentBooth.slug) || undefined,
  thumbnail: {
    name: p.name,
    media:
      (p.useCustomThumbnail &&
        p.customThumbnail &&
        parseDatoCmsAsset(p.customThumbnail)) ||
      parseAttachment(
        p.attachments.find(a => a.__typename === "ImageAttachmentRecord")
      ),
  },
  details: {
    name: p.name,
    description: p.description,
    attachments: p.attachments.map(a => parseAttachment(a)),
    rating: p.rating,
  },
})

const parseEvent = ({ slug, code, name, host, description, booths }) => {
  try {
    return {
      slug,
      code,
      name,
      host: (host && host.name) || undefined,
      description,
      booths: booths
        .filter(b => b.isActive)
        .map(b => ({
          slug: b.slug,
          name: b.name,
          poster: {
            name: b.name,
            description: b.description,
            media: parseDatoCmsAsset(b.posterVideo),
          },
          products: b.products
            .filter(p => p.isActive)
            .map(p => parseProduct(p, b)),
        })),
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  parseEvent,
}
