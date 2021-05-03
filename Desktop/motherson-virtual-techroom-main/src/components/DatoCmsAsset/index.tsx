import React from "react"
import { IDatoCmsAsset } from "../../types/Media"
import GatsbyImageWithIEPolyfill from "gatsby-image/withIEPolyfill"
import { VideoPlayer } from "../VideoPlayer"

export const DatoCmsAsset: React.FC<{
  asset: IDatoCmsAsset
  videoProps?: { eager?: boolean }
  [other: string]: any
}> = ({ asset, videoProps = {}, ...props }) => {
  if (asset.mimeType === "application/pdf") {
    return (
      <iframe
        frameBorder={0}
        src={asset.url + "#toolbar=0&statusbar=0&navpanes=0"}
      />
    )
  }
  if (asset.video) {
    return (
      <VideoPlayer
        video={asset.video}
        height={asset.height}
        width={asset.width}
        {...videoProps}
      />
    )
  }

  if (asset.responsiveImage) {
    return <GatsbyImageWithIEPolyfill fluid={asset.responsiveImage} />
  }

  return null
}
