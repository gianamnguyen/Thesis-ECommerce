import axios from "axios";
const USD_TO_VND_API = "https://open.er-api.com/v6/latest/USD"
const ETH_EXCHANGE_RATE_API = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

export const getUsdToVndExchangeRate = async () => {
  try {
    const response = await axios.get(USD_TO_VND_API);
    const usdToVndExchangeRate = response.data.rates.VND;
    return usdToVndExchangeRate;
  } catch (error) {
    console.error('Error fetching USD to VND exchange rate:', error);
    return null;
  }
}

export const getEthExchangeRate = async () => {
  try {
    const response = await axios.get(ETH_EXCHANGE_RATE_API);
    const ethExchangeRate = response.data.ethereum.usd;
    return ethExchangeRate;
  } catch (error) {
    console.error('Error fetching ETH exchange rate:', error);
    return null;
  }
}