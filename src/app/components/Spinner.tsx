import React from 'react';

const Spinner = ({ border = 'white' }: { border?: string }) => {
  return (
    <div className='flex justify-center items-center'>
      <div
        className={`animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-${border}`}
      ></div>
    </div>
  );
};

export default Spinner;
