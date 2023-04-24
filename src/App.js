
import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import './index.css'




function App() {
  const [from, setfrom] = useState("INR")
  const [to, setto] = useState("KRW")
  const [amount, setamount] = useState(1)
  const [exchangeRate, setexchangeRate] = useState([])
  const [maxminrate, setmaxminrate] = useState({})
  const [isMaxClicked, setisMaxClicked] = useState(false)

  const fetchObject = {
    method: "GET",

  }
  function handleFromChange(event) {
    setfrom(event.target.value);
  }
  function handleToChange(event) {
    setto(event.target.value)
  }
  function handleAmountChange(event) {
    setamount(event.target.value)
  }

  const getRates = async () => {
    try {
      const response = await fetch(`/currency-exchange?from=${from}&to=${to}&amount=${amount}`, fetchObject)
      console.log(response)

      let data;

      if (response.ok) {
        
        const data = await response.json();
        console.log("data", data.data)
        const exchangeRates = data.data
        setexchangeRate(() => {
          return [...exchangeRates]
        });
      } else {
        const data = await response.json();
        const { status, message } = data;
        window.alert(message);
      }

    } catch (error) {
      return console.log(error.message)
    }
  }

  const getMaxRate = async () => {
    try {

      const response = await fetch('/convert', fetchObject)

      let data;

      if (response.ok) {
        
        data = await response.json()
        let maxminRate = data.data
        setisMaxClicked(true)
        setmaxminrate(() => {
          return { ...maxminRate }
        })

      } else {
        let { status, message } = data
        window.alert(message)
      }

    } catch (error) {
      return console.log(error.message)
    }
  }

  return (
    <>
      <div className='outer_input'>
        <div className='input'>
          <h3 style={{ marginRight: '100px' }}>Amount : <input style={{ height: "30px", width: "190px" }} value={amount} onChange={handleAmountChange} /> </h3>
          <h3 style={{ marginRight: '100px' }}>
            From : <select style={{ height: "40px", width: "190px" }} value={from} onChange={handleFromChange}>
              <option value="INR">INR - Indian Rupees</option>
              <option value="KRW">KRW - Sount Korean Won</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="CNY">CNY - Chinese Yuan Renminbi</option>
            </select>
          </h3>
          <h3 style={{ marginRight: '100px' }}>
            To : <select style={{ height: "40px", width: "190px" }} value={to} onChange={handleToChange}>
              <option value="INR">INR - Indian Rupees</option>
              <option value="KRW">KRW - Sount Korean Won</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="CNY">CNY - Chinese Yuan Renminbi</option>
            </select>
          </h3>
        </div>
      </div>
      <div  className='outer_btn'>
      <div >
      <button className='btn' onClick={getMaxRate}>max & min rate</button>
      <button className='btn' onClick={getRates}>
        convert
      </button>
      
      </div>
      </div>
      
      <div className='card_outer'>
      <div className='maxminrate_outer'>
      {isMaxClicked ? <div className='maxminrate' >
        <Row gutter={16} >
          <Col span={8}>
            <Card title={`source : ${maxminrate.max_rate.source}`} bordered={false} style={{ backgroundColor: '#AEC6CF', color: '#333' }}>
              <h4>Maximum rate : {maxminrate.max_rate.rate}</h4>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} >
          <Col span={8}>
            <Card title={`source : ${maxminrate.min_rate.source}`} bordered={false} style={{ backgroundColor: '#AEC6CF', color: '#333' }}>
              <h4>Minimum rate : {maxminrate.min_rate.rate}</h4>
            </Card>
          </Col>
        </Row>
      </div> : null}
      </div>
      <div  className='exchange_outer'>
      <div className='exchange_rate' >
        {exchangeRate.map((val, ind) => {
          return <div>
            <Row gutter={16} key={ind}>
              <Col span={8}>
                <Card title={`source : ${val.source}`} bordered={false} style={{ backgroundColor: '#AEC6CF', color: '#333' }}>
                  <h4>Exchange rate : {val.exchange_rate}</h4>
                </Card>
              </Col>
            </Row>
          </div>
        })}
      </div>
      </div>
      </div>
    </>
  );
}

export default App;
