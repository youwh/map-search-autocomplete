import SearchInput from './components/inputs/SearchInput'
import Map from './components/maps/Map'

function App() {
  return (
    <div className='App' style={{ position: 'relative' }}>
      <Map></Map>
      <SearchInput />
    </div>
  )
}

export default App
