import React from "react"
import { StaticImage } from "gatsby-plugin-image"
//@ts-ignore
import blurSvg from "../../images/blur.svg"

export const DefaultBg: React.FC = props => (
  <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0 }}>
    <StaticImage
      src="../../images/backdrop.jpg"
      alt={""}
      style={{ width: "100%", height: "100%" }}
      objectFit={"cover"}
      placeholder={"none"}
      quality={1}
      className={"blur100"}
      imgStyle={{ filter: "blur(100px)" }}
    />
    {props.children}
  </div>
)

export const EventBg: React.FC = props => (
  <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0 }}>
    <StaticImage
      src="../../images/Temp_render (1).png"
      alt={""}
      style={{ width: "100%", height: "100%" }}
      objectFit={"cover"}
      placeholder={"none"}
      quality={90}
    />
    {props.children}
  </div>
)
