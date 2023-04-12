import React from 'react'
import Food from './Food'
function Orders({ currentOrders }) {
    return (
        <div className='current-orders-ctr'>
            {Object.entries(currentOrders).map(vals => {
                return (
                    <>
                        <h1>{vals[0]}</h1>
                        <h1>{vals[1]}</h1>
                    </>

                )
            })}
        </div>
    )
}

export default Orders