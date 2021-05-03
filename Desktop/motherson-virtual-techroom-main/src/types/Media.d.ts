import { FluidObject } from "gatsby-image"

type ResponsiveImage = FluidObject & {
  alt?: string
  width: number
  height: number
  bgColor: string
}

export type Video = {
  duration?: number
  framerate?: number
  mp4Url: string
  thumbnailUrl?: string
}

export type IDatoCmsAsset = {
  alt?: string
  title?: string
  url: string
  responsiveImage?: ResponsiveImage
  height?: number
  width?: number
  video?: Video
  mimeType: string
  filename: string
}
