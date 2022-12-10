import { AutoComplete } from 'antd'
import { useEffect, useRef, useState } from 'react'
import usePlaceAutoComplete from '../../hooks/usePlaceAutoComplete'
import usePlaceLocation from '../../hooks/usePlaceLocation'
import styles from './SearchInput.module.css'

function SearchInput() {
  const { search } = usePlaceAutoComplete()
  const { locate } = usePlaceLocation()
  const inputRef = useRef<any>()

  const [searchValue, setSearchValue] = useState('')
  const [options, setOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      search(searchValue, (response: any) => {
        // response handler
        console.log('sucess', response)

        const opts: OptionType[] = []
        response.predictions.map((predict: any) => {
          opts.push({
            label: predict.description,
            value: predict.description,
            placeId: predict.place_id,
          })
        })
        setOptions(opts)
      }).catch((error) => {
        // error handler
      })
    }, 500)
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [searchValue])

  const onChange = (value: string) => {
    setSearchValue(value)
  }

  const onSelect = (data: string) => {
    const placeId: string | undefined = options.find((option) => option.value === data)?.placeId
    if (placeId) {
      locate(placeId, (response: any) => {
        // response handler
        const location = response.result.geometry.location
        console.log('location', location)
      })
    }
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

type OptionType = { label: string; value: string; placeId: string }
