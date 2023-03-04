import Head from 'next/head';
import React, { useState, useEffect } from 'react';


function HexCalculator() {
  const [hex, setHex] = useState('');
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [binaryHead, setBinaryHead] = useState([])

  const handleHexChange = (event) => {
    const value = event.target.value;
    setHex(value);
    setBinary(hexToBinary(value));
    setDecimal(hexToDecimal(value));
  };

  const hexToBinary = (hexString) => {
    const decimalNumber = parseInt(hexString, 16);
    const binaryString = decimalNumber.toString(2);
    return binaryString;
  };

  const hexToDecimal = (hexString) => {
    const decimalNumber = parseInt(hexString, 16);
    return decimalNumber;
  };

  useEffect(() => {
    let decimalArray = [1]

    for (let i = 1; i < hexToBinary(hex).split('').length; i++) {
        decimalArray.push(decimalArray[decimalArray.length - 1] * 2)
    }

    decimalArray.reverse()
    setBinaryHead(decimalArray)
}, [hex])

  const isCellOne = (cellValue) => cellValue === "1";

  function handleKeyPress(event) {
    const validChars = /[1-9a-f]/gi;
    const key = String.fromCharCode(event.keyCode || event.which);
    if (!validChars.test(key)) {
      event.preventDefault();
    }
  }

  return (
    <div className='container'>
    <Head>
    <title>Hexidecimal Calculator</title>
    </Head>
      <h1 className='text1'>Hex Calculator</h1>
      <form>
      <div className='input-container'>
        <input type="text" onKeyPress={handleKeyPress} maxlength="6" id='HexidecimalNumber' autoComplete='off' placeholder='Ender Hexidecimal Number' required className='text-input' value={hex} onChange={handleHexChange} />
        <label for="Hexidecimal Number" className='label'>Hexidecimal Number</label>
      </div>
      </form>
      <div>
      <table className='content-table'>
        <thead>
        <tr>
            <th>Hex</th>
            <th>Bin</th>
            <th>Dec</th>
          </tr>
        </thead>
        <tbody>
          <tr className='active-row'>
            <td>{hex}</td>
            <td>{binary}</td>
            <td>{decimal}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div>
      <table className='content-table2'>
        <thead>
          <tr>
            {binaryHead.map((number) => <th>{number}</th>)}
          </tr>
          </thead>
        <tbody>
          <tr className='active-row2'>
              {hexToBinary(hex).split('').map((value) => <td className={value === '1' ? 'green' : ''}>{value}</td>)}
          </tr>
        </tbody>
      </table>
      </div>
      <div className='nav'>
          <nav>Hexidecimal Calculator by ©Denis Vrabie 2023</nav>
      </div>
    </div>
  );
}

export default HexCalculator;