import { useState } from 'react';
import './App.css';
import InputBox from './components/inputBox';
import useCurrencyInfo from './customhooks';
import { TbSort09 } from 'react-icons/tb';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const convertSwap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo || !currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('/curr.jpeg')`,
      }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen">
        <h1 className="text-4xl md:text-5xl w-screen bg-orange-500 lg:text-6xl font-extrabold text-center text-gray-800 dark:text-white tracking-tight leading-tight mt-8">
          Welcome to <span className="text-blue-600">Currency Converter</span>
        </h1>

        <div className="flex flex-col items-center mt-10 space-y-5">
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            SelectCurrency={from}
            onCurrencyChange={setFrom}
            CurrencyOptions={options}
          />

          <button
            onClick={convertSwap}
            className="text-2xl p-2 bg-gray-200 rounded-full"
          >
            <TbSort09 />
          </button>

          <InputBox
            label="To"
            amount={convertedAmount}
            SelectCurrency={to}
            onCurrencyChange={setTo}
            CurrencyOptions={options}
            currencyDisable={false}
            amountDisable={true}
          />

          <button
            onClick={convert}
            className="mt-5 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
