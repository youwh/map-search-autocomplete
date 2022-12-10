import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import searchStore, { SearchData } from '../../store/searchStore'

const defaultProps = {
  center: {
    lat: 3.157,
    lng: 101.712,
  },
  zoom: 16,
}

function Map(props: { children?: React.ReactNode }) {
  const [map, setMap] = useState<any>()
  const [searchData, setSearchData] = useState<Partial<SearchData>>({
    center: {
      ...defaultProps.center,
    },
  })

  useEffect(() => {
    searchStore.subscribe(setSearchData)
  }, [])

  useEffect(() => {
    console.log('update', searchData.center)
    map?.panTo(searchData.center)
  }, [searchData])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: 'AIzaSyCo6OJY_TKn8jRkEH5o9YBqQqsz0FJryYE' }}
        defaultCenter={searchData.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map)
        }}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  )
}

export default Map
