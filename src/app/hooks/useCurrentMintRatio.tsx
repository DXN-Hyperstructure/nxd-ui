import { NXD_MINT_FINAL_RATE, NXD_MINT_INITIAL_RATE } from '@/consts';
import React, { useEffect, useState } from 'react';

interface CurrentRatioProps {
  startTimeSeconds: number;
}
const calculateCurrentRatio = ({ startTimeSeconds }: CurrentRatioProps) => {
  const milliSecondsPassed = Date.now() - startTimeSeconds * 1000;
  const decreasePerMs =
    (NXD_MINT_INITIAL_RATE - NXD_MINT_FINAL_RATE) / (86400000 * 14);
  // (NXD_MINT_INITIAL_RATE - NXD_MINT_FINAL_RATE) / (15 * 60 * 1000);

  return NXD_MINT_INITIAL_RATE - milliSecondsPassed * decreasePerMs;
};

const useCurrentMintRatio = ({ startTimeSeconds }: CurrentRatioProps) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateCurrentRatio({ startTimeSeconds })
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateCurrentRatio({ startTimeSeconds }));
    }, 1000);

    return () => clearTimeout(timer);
  });
  return timeLeft;
};

export default useCurrentMintRatio;
