import { Booth } from "./Booth"

export type Event = {
  slug: string
  code?: string
  name: string
  description?: string
  host?: string
  booths: Booth[]
}
