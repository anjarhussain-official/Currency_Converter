import React from 'react'
import './CurrencyRow.css'


export default function CurrencyRow(props) {
  const{
    country,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  }=props

  return (
      <div>
        <input type='number' className="input" value={amount} onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {country.map(option =>(
            <option key={option} value={option}>{option}</option>
          ))}
         
        </select>
      </div>
  )
}