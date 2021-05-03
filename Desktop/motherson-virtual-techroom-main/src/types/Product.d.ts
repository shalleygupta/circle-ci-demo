import { IDatoCmsAsset } from "./Media"

export type ProductThumbnail = {
  name: string
  media: IDatoCmsAsset
}

export type ProductDetails = {
  name: string
  description?: string
  rating: number
  attachments: (IDatoCmsAsset & {
    visibility: "default" | "confidential"
  })[]
}

export type Product = {
  slug: string
  parentBoothSlug: string
  thumbnail: ProductThumbnail
  details: ProductDetails
}
