import React,{useEffect,useState} from "react"
import CurrencyRow from './CurrencyRow'
import  './App.css'

const URL_API = 'https://v6.exchangerate-api.com/v6/f185b3a5efc8cfc127b1873a/latest/USD'
function App(){

  const[country,setCountry] = useState([])
  const [initcurr, setinitcurr] = useState()
  const [finalcurr, setfinalcurr] = useState()
  const[exchange,setExchange] = useState()
  const[amount,setAmount] = useState(1)
  const [amountInt,setAmountInt]=useState(true)

  let toAmount,fromAmount
  if(amountInt){
    fromAmount=amount
    toAmount=amount*exchange
  }
  else{
    toAmount=amount
    fromAmount=amount/exchange
  }



  useEffect(() =>{
    fetch(URL_API)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        setCountry([data.base_code, ...Object.keys(data.conversion_rates)])
        setinitcurr(data.base_code)
        setfinalcurr(firstCurrency)
        setExchange(data.conversion_rates[firstCurrency])
      })

  },[])

  useEffect(() => {
    if (initcurr != null && finalcurr != null) {
      fetch(`${URL_API}?base_code=${initcurr}&symbols=${finalcurr}`)
        .then(res => res.json())
        .then(data => setExchange(data.conversion_rates[finalcurr]))
    }
  }, [initcurr, finalcurr])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInt(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInt(false)
  }
  return(
    <>
    <div className="container">
      
      <div className="fluid-container">
        <div className="fluid-child">
          <CurrencyRow
           country={country}
           selectedCurrency={initcurr}
           onChangeCurrency={e => setinitcurr(e.target.value)}
           onChangeAmount={handleFromAmountChange}
           amount={fromAmount}/>
        </div>
        <h3 className="equal">=</h3>
        <div className="fluid-child">
          <CurrencyRow 
          country={country}
          selectedCurrency={finalcurr}
          onChangeCurrency={e => setfinalcurr(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}/>
        
        </div>
      </div>
      </div>
    </>
  )
}
export default App;
