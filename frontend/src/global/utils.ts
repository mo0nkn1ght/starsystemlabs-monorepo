import { formatUnits } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';
import { intervalToDuration } from 'date-fns';

export function formatAmount(value: BigNumberish | undefined, decimals = 18, fractionDigits = 2) {
  return Number(formatUnits(value || '0', decimals)).toLocaleString('en-US', {
    maximumFractionDigits: fractionDigits,
  });
}

export function openNewTab(url: string) {
  window.open(url, '_blank');
}

export const getFormatedMessage = (message?: string) => {
  return message;
};

export function convertToDuration(startDate: number, endDate: number) {
  const formatNumber = (number?: number) => (!number || number < 10 ? `0${number}` : number);
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(startDate * 1000),
    end: new Date(endDate * 1000),
  });

  return `${days ? `${formatNumber(days)}:` : ''}${days || hours ? `${formatNumber(hours)}:` : ''}${
    days || hours || minutes ? `${formatNumber(minutes)}:` : ''
  }${formatNumber(seconds)}`;
}

export const secondsToDhms = (seconds: string) => {
  const secs = Number(seconds);
  const d = Math.floor(secs / (3600 * 24));
  const h = Math.floor((secs % (3600 * 24)) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
