import { BigNumber } from 'bignumber.js';
import Numeral from 'numeral';

export const formattedNum = (
  number?: number | string,
  hideSmallAmounts = false,
  usd = false,
  precision = 5
) => {
  if (!number) return usd ? '$0' : 0;
  if (isNaN(number as number) || number === '' || number === undefined) {
    return usd ? '$0' : 0;
  }
  const num = parseFloat(number.toString());

  if (num > 500000000) {
    return (usd ? '$' : '') + toK(num.toFixed(0));
  }

  if (num === 0) {
    if (usd) {
      return '$0';
    }
    return 0;
  }

  if (hideSmallAmounts && num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001';
  }

  if (num > 1000 || !hideSmallAmounts) {
    return usd
      ? formatDollarAmount(num, 0)
      : Number(parseFloat(num.toString()).toFixed(precision)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return formatDollarAmount(num, 4);
    } else {
      return formatDollarAmount(num, 2);
    }
  }

  return Number(parseFloat(num.toString()).toFixed(precision)).toString();
};

export const formatDollarAmount = (num: number, digits: number) => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatter.format(num);
};

export const toK = (num: string | number) => {
  return Numeral(num).format('0.[00]a');
};

export const multiplyByDecimals = (
  amount: string | number,
  decimals: number
) => {
  return new BigNumber(amount.toString())
    .times(new BigNumber(10).pow(decimals))
    .toFixed();
};

export const divideByDecimals = (amount: string, decimals: number) => {
  return new BigNumber(amount).div(new BigNumber(10).pow(decimals)).toFixed();
};

export const formatAddressForDisplay = (
  address?: string,
  start = 6,
  end = 4
) => {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-1 * end)}`;
};

export const handleNumberInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  setter: (value: string) => void,
  allowDecimals: boolean
) => {
  const inputValue = event.target.value;
  let sanitizedValue = '0';
  if (allowDecimals) {
    // Remove any non-numeric characters except decimal point
    sanitizedValue = inputValue.replace(/[^0-9.]/g, '');

    // Ensure there's only one decimal point
    const decimalCount = sanitizedValue.split('.').length - 1;
    if (decimalCount > 1) return;
  } else {
    sanitizedValue = inputValue.replace(/\D/g, '');

    // Remove leading zeros
    sanitizedValue = sanitizedValue.replace(/^0+/g, '');
  }

  setter(sanitizedValue);
};
