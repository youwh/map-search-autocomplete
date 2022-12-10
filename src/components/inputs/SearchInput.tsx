import { AutoComplete } from 'antd'
import { useState } from 'react'
import styles from './SearchInput.module.css'

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
})

function SearchInput() {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<{ value: string }[]>([])

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    )
  }

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }

  const onChange = (data: string) => {
    setValue(data)
  }

  return (
    <div className={styles.inputContainer}>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder='Suria KLCC'
      />
    </div>
  )
}

export default SearchInput
