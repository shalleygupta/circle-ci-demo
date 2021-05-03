import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { Product, ProductDetails } from "../../types/Product"
import * as S from "./desktop.styled"
import { DatoCmsAsset } from "../DatoCmsAsset"
import { IDatoCmsAsset } from "../../types/Media"
import { useInView } from "react-intersection-observer"
//@ts-ignore
import warningIcon from "../../icons/ic-warning.svg"
import { useEventNavigation } from "../../context/EventNavigationContext"

export const ProductAttachmentsDesktop: React.FC<
  ProductDetails & { previous?: Product }
> = ({ attachments, name, previous }) => {
  const [currentAttachment, setCurrentAttachment] = useState<number>(0)
  const [pagerVisible, setPagerVisible] = useState<boolean>(true)

  useEffect(() => setCurrentAttachment(0), [attachments])

  const attachmentsContainerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    setPagerVisible(!attachments[currentAttachment]?.mimeType.includes("pdf"))
  }, [currentAttachment, attachments])

  const { getProductUrl } = useEventNavigation()

  return (
    <S.Container>
      <S.Global />
      <S.Attachments ref={attachmentsContainerRef}>
        {attachments.map((at, i) => (
          <Attachment
            attachment={at}
            key={at.url}
            onVisible={() => setCurrentAttachment(i)}
          />
        ))}
      </S.Attachments>
      <S.LabelContainer>
        <S.Previous>
          {previous && (
            <>
              <S.PreviousOverline>Previous</S.PreviousOverline>
              <S.PreviousTitle
                to={getProductUrl(previous)}
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <S.ArrowLeft />
                {previous.details.name}
              </S.PreviousTitle>
            </>
          )}
        </S.Previous>

        <S.ConfidentialLabel
          visible={attachments[currentAttachment].visibility === "confidential"}
        >
          <img src={warningIcon} alt={"Warning"} />
          <span>Strictly confidential</span>
        </S.ConfidentialLabel>
      </S.LabelContainer>
      <S.Pager visible={pagerVisible}>
        {attachments.map((a, i) => (
          <S.Dot
            key={a.url}
            active={currentAttachment === i}
            onClick={() => {
              window.scrollTo({
                top: (attachmentsContainerRef.current.childNodes[
                  i
                ] as HTMLDivElement).offsetTop,
                behavior: "smooth",
              })
            }}
          />
        ))}
      </S.Pager>
    </S.Container>
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
  return (
    <S.AttachmentContainer forVideo={!!attachment.video} ref={ref}>
      <DatoCmsAsset asset={attachment} videoProps={{ eager: false }} />
    </S.AttachmentContainer>
  )
}
