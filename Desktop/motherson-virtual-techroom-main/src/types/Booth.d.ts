import { IDatoCmsAsset } from "./Media"
import { Product } from "./Product"

export type Poster = {
  name: string
  description?: string
  media?: IDatoCmsAsset
}

export type Booth = {
  order: number
  slug: string
  name: string
  poster: Poster
  products: Product[]
}
