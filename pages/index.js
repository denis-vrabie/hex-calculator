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
    const validChars = /[0-9a-f]/gi;
    const key = String.fromCharCode(event.keyCode || event.which);
    if (!validChars.test(key)) {
      event.preventDefault();
    }
  }

  return (
    <div className='container'>
    <Head>
    <title>Hexidecimal Calculator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
      <h1 className='text1'>Hex Calculator</h1>
      <form>
      <div className='input-container'>
        <input type="text" onKeyPress={handleKeyPress} maxlength="6" id='HexidecimalNumber' autoComplete='off' required value={hex} onChange={handleHexChange} />
        <span>Hexidecimal Number</span>
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
      <h2>Distribution of a binary in the decimal</h2>
      <table className='content-table2'>
        <thead>
          <tr>
            {binaryHead.map((number) => <th>{number}</th>)}
          </tr>
          </thead>
        <tbody>
          <tr className='active-row2'>
              {hexToBinary(hex).split('').map((value, index) => <td data-label={binaryHead[index]} className={value === '1' ? 'green' : ''}>{value}</td>)}
          </tr>
        </tbody>
      </table>
      </div>
      <footer>
          <p>Hexidecimal Calculator by Denis Vrabie 2023</p>
      </footer>
    </div>
  );
}

export default HexCalculator;