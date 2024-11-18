import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PaymentSuccess() {
    const SearchQuery = useSearchParams()[0];
    const referenceNum = SearchQuery.get("reference");
    return (
        <div className='text-center' >
            <h2 className='text-xl font-bold' >Payment Success</h2>
            <h3 className='text-lg'>refrenceID:- <h2 className='font-bold'> {referenceNum} </h2></h3>
        </div>
    )
}
