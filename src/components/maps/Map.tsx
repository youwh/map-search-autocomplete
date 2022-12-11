import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import searchStore, { SearchData } from '../../store/searchStore'
import withSearch from './withSearch'

const defaultProps = {
  center: {
    lat: 3.157,
    lng: 101.712,
  },
  zoom: 16,
}

let mark
function Map() {
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
    console.log('moveTo', searchData.center)
    map?.panTo(searchData.center)
    map?.setZoom(defaultProps.zoom)
    mark?.setPosition(
      new google.maps.LatLng(searchData.center?.lat || 0, searchData.center?.lng || 0),
    )
  }, [searchData])

  const renderMarker = (map, maps) => {
    const marker = (mark = new maps.Marker({
      position: searchData?.center,
      map,
    }))
    return marker
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAWfo1wqrNQ2uy8nfD1gy2xa66RZD1yQBA' }}
        defaultCenter={searchData.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map)
          renderMarker(map, maps)
          // Marker(map, maps)
        }}
      ></GoogleMapReact>
    </div>
  )
}

export default withSearch(Map)
