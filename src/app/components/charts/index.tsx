
import React from 'react';

const Charts = () => {
    return (

        <div className='mt-4 lg:mt-8 mb-6 mx-2 lg:mx-auto lg:max-w-7xl'>

            {/*  first */}
            <div className='flex flex-col lg:flex-row'>
                {/* first colonne */}
                <div className='flex-1 lg:w-1/2 mb-4 lg:mb-0 lg:mr-2'>
                    <div className='bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
                        <div className='flex-1 pr-2 lg:pr-4 flex flex-col lg:flex-row'>
                            <div className='p-4 lg:p-8 flex-1 lg:w-1/2'>
                                <h2 className='text-xl font-bold text-gray-800 mb-6 lg:mb-0'>
                                    NXD Price Floor
                                </h2>
                            </div>
                            <div className='p-4 lg:p-8 '>
                                1D 1W 1M 3M <span className="text-[#4097FF]">6M</span> 1Y ALL
                            </div>
                        </div>
                        <div className='p-4 lg:p-8'>
                            <h2 className='text-l font-bold text-gray-800 mb-3'>
                                Price Floor NXD = XXX DXN development over Time
                            </h2>
                        </div>
                    </div>
                </div>

                {/* second colonne */}
                <div className='flex-1 lg:w-1/2'>
                    <div className='bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
                        <div className='flex-1 pr-2 lg:pr-4 flex flex-col lg:flex-row'>
                            <div className='p-4 lg:p-8 flex-1 lg:w-1/2'>
                                <h2 className='text-xl font-bold text-gray-800 mb-6 lg:mb-0'>
                                    NXD Total Burns
                                </h2>
                            </div>
                            <div className='p-4 lg:p-8 '>
                                1D 1W 1M 3M <span className="text-[#58BD7D]">6M</span> 1Y ALL
                            </div>
                        </div>
                        <div className='p-4 lg:p-8'>
                            <h2 className='text-l font-bold text-gray-800 mb-3'>
                                Total NXD Burns over Time
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* second  */}
            <div className='flex flex-col lg:flex-row mt-4 lg:mt-8'>
                {/* first colonne */}
                <div className='flex-1 lg:w-1/2 mb-4 lg:mb-0 lg:mr-2'>
                    <div className='bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
                        <div className='flex-1 pr-2 lg:pr-4 flex flex-col lg:flex-row'>
                            <div className='p-4 lg:p-8 flex-1 lg:w-1/2'>
                                <h2 className='text-xl lg:text-xl font-bold text-gray-800 mb-6 lg:mb-0 whitespace-nowrap'>
                                    NXD Burns as % of Total Supply NXD
                                </h2>
                            </div>
                            <div className='p-4 lg:p-8 '>
                                1D 1W 1M 3M <span className="text-[#58BD7D]">6M</span> 1Y ALL
                            </div>
                        </div>
                        <div className='p-4 lg:p-8'>
                            <h2 className='text-l font-bold text-gray-800 mb-3'>
                                NXD Burns as a % of Total Supply NXD over Time
                            </h2>
                        </div>
                    </div>
                </div>

                {/* second colonne */}
                <div className='flex-1 lg:w-1/2'>
                    <div className='bg-white rounded-3xl shadow-lg px-4 lg:px-8 py-4 lg:py-8'>
                        <div className='flex-1 pr-2 lg:pr-4 flex flex-col lg:flex-row'>
                            <div className='p-4 lg:p-8 flex-1 lg:w-1/2'>
                                <h2 className='text-xl font-bold text-gray-800 mb-6 lg:mb-0'>
                                    Total DXN Compounded
                                </h2>
                            </div>
                            <div className='p-4 lg:p-8 '>
                                1D 1W 1M 3M <span className="text-[#4097FF]">6M</span> 1Y ALL
                            </div>
                        </div>
                        <div className='p-4 lg:p-8'>
                            <h2 className='text-l font-bold text-gray-800 mb-3'>
                                Total DXN Compounded over Time
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Charts;

