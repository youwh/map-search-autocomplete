import SearchInput from './components/inputs/SearchInput'
import Map from './components/maps/Map'

export const key = 'AIzaSyCo6OJY_TKn8jRkEH5o9YBqQqsz0FJryYE'

function App() {
  return (
    <div className='App' style={{ position: 'relative' }}>
      <Map />
      <SearchInput />
    </div>
  )
}

export default App
