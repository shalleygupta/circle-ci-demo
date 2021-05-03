import React, { useEffect, useState } from "react"
import { ProductDetails } from "../../types/Product"
import * as S from "./mobile.styled"
import { DatoCmsAsset } from "../DatoCmsAsset"
import { IDatoCmsAsset } from "../../types/Media"
import { useInView } from "react-intersection-observer"
import warningIcon from "../../icons/ic-warning.svg"

export const ProductAttachmentsMobile: React.FC<ProductDetails> = ({
  attachments,
  name,
}) => {
  const [activeAttachment, setActiveAttachment] = useState<number>(0)
  return (
    <S.Wrapper>
      <S.AssetsContainer>
        {attachments.map((at, i) => (
          <Attachment
            key={at.url}
            attachment={at}
            onVisible={() => setActiveAttachment(i)}
          />
        ))}
      </S.AssetsContainer>
      <S.Pager>
        {attachments.map((at, i) => (
          <S.Dot active={i === activeAttachment} />
        ))}
      </S.Pager>
      <S.Footer>
        <S.ConfidentialLabel
          visible={attachments[activeAttachment].visibility === "confidential"}
        >
          <img src={warningIcon} alt={"Warning"} />
          <span>Strictly confidential</span>
        </S.ConfidentialLabel>
      </S.Footer>
    </S.Wrapper>
  )
}

const Attachment: React.FC<{
  attachment: IDatoCmsAsset
  onVisible: () => any
}> = ({ attachment, onVisible }) => {
  const { ref, inView } = useInView({ threshold: 1 })
  useEffect(() => {
    if (inView) {
      onVisible()
    }
  }, [inView])

  if (attachment.mimeType?.includes("pdf")) {
    return (
      <S.PdfAttachmentContainer ref={ref}>
        <S.DownloadButton
          download={attachment.filename}
          target={"_blank"}
          href={attachment.url}
        >
          Open {attachment.filename}
        </S.DownloadButton>
      </S.PdfAttachmentContainer>
    )
  }

  return (
    <S.AttachmentContainer forVideo={!!attachment.video} ref={ref}>
      <DatoCmsAsset asset={attachment} videoProps={{ eager: false }} />
    </S.AttachmentContainer>
  )
}
