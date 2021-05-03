import React, { useEffect, useState } from "react"
import { Video } from "../../types/Media"
import ReactPlayer from "react-player"
import styled from "styled-components"
import { animated } from "react-spring"

const LazyWrapper = styled(animated.div)<{
  width: number
  height: number
}>`
  position: relative;
  padding-top: ${props => 100 / (props.width / props.height)}%;

  .video-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const LazyWrapperInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`

export const VideoPlayer: React.FC<{
  video: Video
  eager?: boolean
  width?: number
  height?: number
}> = ({ video, eager = false, width, height }) => {
  const [previewClicked, setPreviewClicked] = useState<boolean>(eager)

  const [currentVideo, setCurrentVideo] = useState<Video | undefined>(video)

  useEffect(() => {
    if (!currentVideo) {
      setCurrentVideo(video)
    } else if (video !== currentVideo) {
      setPreviewClicked(false)
      setCurrentVideo(undefined)
    }
  }, [video, currentVideo])

  if (!currentVideo) return null

  const player = (
    <ReactPlayer
      width={"100%"}
      height={"100%"}
      url={video.mp4Url}
      light={video.thumbnailUrl}
      playsinline
      controls
      playing={previewClicked}
      onClickPreview={() => setPreviewClicked(true)}
    />
  )

  if (!eager && width && height) {
    return (
      <LazyWrapper width={width} height={height}>
        <LazyWrapperInner>{player}</LazyWrapperInner>
      </LazyWrapper>
    )
  }
  return <div>{player}</div>
}
