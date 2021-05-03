import { Product, ProductDetails } from "../../types/Product"
import React from "react"
import { useMedia } from "use-media"
import { size } from "../../theme/devices"
import { ProductAttachmentsDesktop } from "./desktop"
import { ProductAttachmentsMobile } from "./mobile"

export const ProductAttachments: React.FC<
  ProductDetails & { previous?: Product }
> = props => {
  const isDesktop = useMedia({ minWidth: size.desktop })

  return isDesktop ? (
    <ProductAttachmentsDesktop {...props} />
  ) : (
    <ProductAttachmentsMobile {...props} />
  )
}
