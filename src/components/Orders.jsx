import React, { useEffect, useState } from 'react'
import Order from './Order'

function Orders({ currentOrders, currentMenu, updateMenu }) {


    const [totalPrice, setTotalPrice] = useState(0) // The total price of the current orders.


    // Calculate price for each currentOrders
    useEffect(() => {
        let price = 0
        Object.entries(currentOrders).map((vals) => {
            const food = vals[0]
            const qty = vals[1]
            const addedPrice = currentMenu[food].price * qty
            price += addedPrice
        })
        setTotalPrice(price)
    }, [currentOrders])



    return (
        <div className='current-orders-ctr'>
            <h1>ORDERS</h1>
            {Object.entries(currentOrders).map(vals => {
                return (
                    <Order key={vals[0]} food={vals[0]} qty={vals[1]} />
                )
            })}

            <h2 className='total-price'> total: {totalPrice}</h2>
            <button onClick={() => { updateMenu(totalPrice) }}>Save Order</button>


        </div>
    )
}

export default Orders