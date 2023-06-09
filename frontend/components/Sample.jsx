import React, { useState } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  const convertToWords = (value) => {
    const singleDigits = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
    ];

    const doubleDigits = [
      '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    const tens = [
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
      'seventeen', 'eighteen', 'nineteen'
    ];

    const placeValues = ['', 'thousand', 'lakh', 'crore', 'arab', 'kharab'];

    const convertGroup = (n) => {
      let str = '';
      const hundred = Math.floor(n / 100);
      const rest = n % 100;

      if (hundred !== 0) {
        str += singleDigits[hundred] + ' hundred ';
      }

      if (rest !== 0) {
        if (rest < 10) {
          str += singleDigits[rest];
        } else if (rest >= 10 && rest < 20) {
          str += tens[rest - 10];
        } else {
          const ten = Math.floor(rest / 10);
          const unit = rest % 10;
          str += doubleDigits[ten];

          if (unit !== 0) {
            str += ' ' + singleDigits[unit];
          }
        }
      }

      return str.trim();
    };

    const convertNumberToWords = (number) => {
      if (number === 0) {
        return 'zero';
      }

      let words = '';
      let groupCount = 0;

      while (number > 0) {
        const group = number % 1000;
        const groupWords = convertGroup(group);

        if (group !== 0) {
          words = groupWords + ' ' + placeValues[groupCount] + ' ' + words;
        }

        number = Math.floor(number / 1000);
        groupCount++;
      }

      return words.trim();
    };

    const formattedValue = parseFloat(value).toFixed(2);
    const amountInWords = convertNumberToWords(parseInt(formattedValue));
    setConvertedAmount(amountInWords);
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    convertToWords(amount);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Amount (in Indian Rupees):
          <input type="number" step="0.01" value={amount} onChange={handleChange} />
        </label>
        <button type="submit">Convert</button>
      </form>
      {convertedAmount && (
        <div>
          <h3>Amount in Words:</h3>
          <p>{convertedAmount} Rupees</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
