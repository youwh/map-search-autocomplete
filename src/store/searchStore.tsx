import { Subject } from 'rxjs'

const subject = new Subject()
const searchStore = {
  subscribe: (setState: any) => subject.subscribe(setState),
  search: (data: SearchData) => {
    subject.next({ ...data })
  },
  unsubscribe: () => subject.unsubscribe(),
}
export default searchStore

export type SearchData = {
  label: string
  value: string
  placeId: string
  center: {
    lat: number
    lng: number
  }
}

export type Observer = Parameters<typeof subject.subscribe>[0]
