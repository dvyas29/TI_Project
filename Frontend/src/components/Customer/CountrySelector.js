import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector() {
  const [country, setCountry] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setCountry(value)
  }

  return <Select options={options} value={country} onChange={changeHandler} />
}

export default CountrySelector