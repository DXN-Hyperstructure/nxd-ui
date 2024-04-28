import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const useToastOnWriteContractError = ({
  isError,
  writeContractError,
}: {
  isError: boolean;
  writeContractError: any;
}) => {
  useEffect(() => {
    if (isError && writeContractError) {
      let details = writeContractError?.details?.toString();
      if (details) {
        toast('Error: ' + details, {
          type: 'error',
        });
        return;
      }
      let errorMessage = (writeContractError.message as string)
        .split('Error:')[1]
        ?.split('Contract')?.[0];
      toast(
        'Error: ' +
          (errorMessage
            ? errorMessage
            : (writeContractError?.cause?.toString() as string)
                ?.split('reverted with the following reason:')[1]
                ?.split('Version:')?.[0]),
        {
          type: 'error',
        }
      );
    }
  }, [isError, writeContractError]);
};

export default useToastOnWriteContractError;
