import GoogleMapReact from 'google-map-react'

const defaultProps = {
  center: {
    lat: 3.157,
    lng: 101.712,
  },
  zoom: 16,
}

export default function Map(props: { children?: React.ReactNode }) {
  console.log('run map')
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: 'AIzaSyCo6OJY_TKn8jRkEH5o9YBqQqsz0FJryYE' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  )
}
