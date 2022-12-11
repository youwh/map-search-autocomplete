import { Component } from 'react'
import SearchInput from '../inputs/SearchInput'
import styles from './Map.module.css'
import PlaceCard from './placeCard/PlaceCard'

const withSearch = (WrappedComponent) => {
  class withSearch extends Component {
    render() {
      return (
        <>
          <WrappedComponent />
          <div className={styles.search}>
            <SearchInput />
            <PlaceCard />
          </div>
        </>
      )
    }
  }
  return withSearch
}
export default withSearch
