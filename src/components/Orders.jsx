import React, { useEffect, useState } from 'react'
import Order from './Order'

function Orders({ currentOrders, currentMenu }) {

    const [newMenu, setNewMenu] = useState(currentMenu)

    useEffect(() => {
        Object.entries(currentOrders).map(vals => {
            const food = vals[0]
            const newQty = currentMenu[food].qty - vals[1]
            setNewMenu({ ...currentMenu, [food]: { ...currentMenu[food], qty: newQty } })
        })
    }, [currentOrders])

    useEffect(() => {
        console.log("NEWMENU: ", newMenu);
    }, [newMenu])



    return (
        <div className='current-orders-ctr'>
            {Object.entries(currentOrders).map(vals => {
                return (
                    <Order key={vals[0]} food={vals[0]} qty={vals[1]} />
                )
            })}
        </div>
    )
}

export default Orders