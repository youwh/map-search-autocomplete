import { AutoComplete } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { BehaviorSubject, debounceTime } from 'rxjs'
import usePlaceAutoComplete from '../../hooks/usePlaceAutoComplete'
import usePlaceLocation from '../../hooks/usePlaceLocation'
import styles from './SearchInput.module.css'

const inputChange = new BehaviorSubject('')
const inputChanged = inputChange.asObservable()

function SearchInput() {
  const { search } = usePlaceAutoComplete()
  const { locate } = usePlaceLocation()
  const inputRef = useRef<any>()

  const [options, setOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const subscription = inputChanged.pipe(debounceTime(500)).subscribe((value) => {
      search(value, (response: any) => {
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
    })

    return () => {
      return subscription.unsubscribe()
    }
  }, [])

  const onChange = (value: string) => {
    inputChange.next(value)
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
        // value={searchValue}
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
