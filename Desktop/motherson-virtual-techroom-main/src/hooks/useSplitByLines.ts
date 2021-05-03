import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useThrottledCallback } from "use-debounce"

const useDebouncedWindowResize = () => {
  const [[width, height], setWindowDimensions] = useState<[number, number]>([
    0,
    0,
  ])
  const onResize = useCallback(
    () => setWindowDimensions([window.innerWidth, window.innerHeight]),
    [setWindowDimensions]
  )
  const throttledOnResize = useThrottledCallback(onResize, 500)
  useEffect(() => {
    window.addEventListener("resize", throttledOnResize)
    return () => window.removeEventListener("resize", throttledOnResize)
  }, [])

  return { width, height }
}

export const useSplitByLines = ({
  text,
  skip,
}: {
  text: string
  skip?: boolean
}) => {
  const ref = React.createRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

  const {
    width: windowWidth,
    height: windowHeight,
  } = useDebouncedWindowResize()

  const [lines, setLines] = useState<string[] | undefined>()

  useEffect(() => {
    if (!ref.current || skip) {
      setLines(undefined)
      return
    }
    const { width, height } = ref.current.getBoundingClientRect()

    // Prepare a temporary text container, child of ref.current, so it inherits styles
    const tempContainer = document.createElement("div")
    tempContainer.style.position = "fixed"
    tempContainer.style.opacity = "0"
    tempContainer.style.width = `${width}px`
    tempContainer.style.height = `${height}px`
    ref.current.appendChild(tempContainer)

    text
      .split("\n")
      .map(line =>
        (line
          .split(" ")
          .map(w => w + " ")
          .filter(s => !!s.replace(" ", ""))
          .map(s => {
            const span = document.createElement("span")
            span.textContent = s
            return span
          }) as (HTMLSpanElement | HTMLBRElement)[]).concat(
          document.createElement("br")
        )
      )
      .reduce((prev, curr) => prev.concat(curr), [])
      .forEach(el => tempContainer.appendChild(el))

    const actualLines = Array.from(tempContainer.children)
      .map(element => ({ y: element.getBoundingClientRect().y, element }))
      .reduce<{ y: number; elements: Element[] }[]>((result, curr) => {
        let parent = result.find(r => r.y === curr.y)
        if (!parent) {
          parent = {
            y: curr.y,
            elements: [],
          }
          result.push(parent)
        }
        parent.elements.push(curr.element)
        return result
      }, [])
      .map(r => r.elements.map(e => e.textContent).join(""))

    console.log(actualLines)
    setLines(actualLines)

    ref.current.removeChild(tempContainer)
  }, [text, skip, windowWidth, windowHeight])

  return { ref, lines }
}
