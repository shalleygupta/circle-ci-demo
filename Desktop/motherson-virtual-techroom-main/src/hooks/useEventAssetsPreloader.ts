import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { EventContext } from "../context/EventContext"
import { IDatoCmsAsset } from "../types/Media"

export type Asset = IDatoCmsAsset & {
  itemId: string
}

type Progress = { itemId: string; status?: "ready" | "failed" }

export const useEventAssetsPreloader = () => {
  const eventContext = useContext(EventContext)
  const [[assets, statuses], setAssets] = useState<[Asset[], Progress[]]>([
    [],
    [],
  ])

  useEffect(() => {
    setAssets([[], []])
    if (!eventContext.data) {
      return
    }
    const allAssets: {
      [id: string]: IDatoCmsAsset
    } = {}
    eventContext.data.booths.forEach(b => {
      if (b.poster.media) {
        allAssets[b.poster.media.url] = b.poster.media
      }
      b.products?.forEach(p => {
        if (p.thumbnail?.media) {
          allAssets[p.thumbnail.media.url] = p.thumbnail.media
        }
        p.details.attachments?.forEach(at => {
          allAssets[at.url] = at
        })
      })
    })
    setAssets([
      Object.keys(allAssets).map(ak => ({ itemId: ak, ...allAssets[ak] })),
      Object.keys(allAssets).map(ak => ({ itemId: ak })),
    ])
  }, [eventContext.data])

  const onAssetReady = useCallback(
    (asset: Asset, status: Progress["status"]) =>
      setAssets(([assets, states]) => [
        assets,
        states.map(s =>
          s.itemId === asset.itemId
            ? {
                ...s,
                status,
              }
            : s
        ),
      ]),
    []
  )
  const onSuccess = useCallback(
    (asset: Asset) => onAssetReady(asset, "ready"),
    [onAssetReady]
  )
  const onFailure = useCallback(
    (asset: Asset) => onAssetReady(asset, "failed"),
    [onAssetReady]
  )

  const progress = useMemo(() => {
    if (!statuses || statuses.length === 0) {
      return 0
    }

    const readyCount = statuses.filter(s => s.status === "ready").length
    const failureCount = statuses.filter(s => s.status === "failed").length

    return (readyCount + failureCount) / statuses.length
  }, [statuses])

  return {
    assets,
    onSuccess,
    onFailure,
    progress,
    eventSlug: eventContext.slug,
  }
}
