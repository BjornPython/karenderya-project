import React, { useEffect, useState } from 'react'
import Order from './Order'

function Orders({ currentOrders, currentMenu, updateMenu }) {

    return (
        <div className='current-orders-ctr'>
            <h1>ORDERS</h1>
            {Object.entries(currentOrders).map(vals => {
                return (
                    <Order key={vals[0]} food={vals[0]} qty={vals[1]} />
                )
            })}
            <button onClick={() => { updateMenu() }}>Save Order</button>
        </div>
    )
}

export default Orders