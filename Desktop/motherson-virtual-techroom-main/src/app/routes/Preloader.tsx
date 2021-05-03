import React, { useEffect } from "react"
import { DefaultBg } from "../../components/Backgrounds"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { GridLayout } from "../../GridLayout"
import styled from "styled-components"
import {
  Asset,
  useEventAssetsPreloader,
} from "../../hooks/useEventAssetsPreloader"
import GatsbyImageWithIEPolyfill from "gatsby-image/withIEPolyfill"
//@ts-ignore
import { ReactComponent as MLogo } from "../../icons/logo-full.svg"
import device from "../../theme/devices"

const Container = styled(GridLayout)`
  cursor: wait;
  height: 100vh;
  grid-template-rows: 1fr repeat(3, auto) 1fr;
  position: relative;
  color: white;
  background: rgba(65, 15, 15, 0.1);
`

const Title = styled.h1`
  grid-row: 2;
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  line-height: 40px;
  letter-spacing: 0;
  text-align: center;
  grid-column: 1 / 7;
  @media (${device.desktop}) {
    grid-column: 1 / 13;
  }
`

const Loader = styled.div<{ percent: number }>`
  grid-row: 3;
  height: 0;
  width: ${props => props.percent * 100}%;
  border: 1px solid #da2020;
  transition: width 250ms ease-out;
  box-sizing: border-box;
  grid-column: 1 / 7;
  @media (${device.desktop}) {
    grid-column: 1 / 13;
  }
`

const Percentage = styled.div`
  grid-row: 4;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 50px;
  letter-spacing: 0;

  grid-column: 1 / 7;
  @media (${device.desktop}) {
    grid-column: 1 / 13;
  }
`

const OffScreen = styled.div`
  display: block;
  visibility: hidden;

  position: fixed;
  top: -500000000000px;
  left: -500000000000px;
`

export const Logo = styled(MLogo)`
  color: white;
  position: absolute;
  right: 20px;
  top: 9px;
  width: 123px;
`

const AssetLoader: React.FC<{
  asset: Asset
  onSuccess: (a: Asset) => any
  onFail: (a: Asset) => any
}> = ({ asset, onSuccess, onFail }) => {
  if (asset.responsiveImage) {
    return (
      <GatsbyImageWithIEPolyfill
        fluid={asset.responsiveImage}
        onLoad={() => onSuccess(asset)}
        onError={() => onFail(asset)}
        loading={"eager"}
      />
    )
  } else if (asset.video?.thumbnailUrl) {
    return (
      <img
        src={asset.video.thumbnailUrl}
        onLoad={() => onSuccess(asset)}
        onError={() => onFail(asset)}
        loading={"eager"}
      />
    )
  }

  // Other types of attachment - loaded later on user request
  onSuccess(asset)
  return null
}

const MemoizedAssetLoader = React.memo(AssetLoader)

export const Preloader: React.FC<
  RouteComponentProps<{ slug: string }>
> = () => {
  const {
    assets,
    progress,
    onFailure,
    onSuccess,
    eventSlug,
  } = useEventAssetsPreloader()
  const history = useHistory()

  useEffect(() => {
    if (progress === 1) {
      history.push(`/${eventSlug}/scene`)
    }
  }, [progress])
  return (
    <>
      <DefaultBg />
      <Logo />
      <Container>
        <Title>Loading the exhibition</Title>
        <Loader percent={progress} />
        <Percentage>{`${Math.round(progress * 100)}%`}</Percentage>
        <OffScreen>
          {assets.map(asset => (
            <MemoizedAssetLoader
              key={asset.itemId}
              asset={asset}
              onSuccess={onSuccess}
              onFail={onFailure}
            />
          ))}
        </OffScreen>
      </Container>
    </>
  )
}
