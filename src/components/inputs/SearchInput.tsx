import { AutoComplete } from 'antd'
import { useEffect, useRef, useState } from 'react'
import usePlaceAutoComplete from '../../hooks/usePlaceAutoComplete'
import styles from './SearchInput.module.css'

function SearchInput() {
  const { search } = usePlaceAutoComplete()
  const inputRef = useRef<any>()

  const [searchValue, setSearchValue] = useState('')
  const [options, setOptions] = useState<{ value: string }[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      search(searchValue, (response) => {
        // response handler
        console.log('sucess', response)
      }).catch((error) => {
        // error handler
      })
    }, 500)
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [searchValue])

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }

  const onChange = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className={styles.inputContainer}>
      <AutoComplete
        value={searchValue}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        // onSearch={onSearch}
        onChange={onChange}
        placeholder='Suria KLCC'
        ref={inputRef}
      />
    </div>
  )
}

export default SearchInput
