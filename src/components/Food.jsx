import React from 'react'

function Food({ food, price, addOrder, decrementOrder, qty = null }) {
    if (food === "rerender") { return } // do not include rerender key
    return (
        <div className='food-container'>

            <div className='food-qty'>
                <h1>{food}</h1>
                {qty ? <p>left: {qty}</p> : <></>}
            </div>
            <div className='price-add'>
                <h1>{price} PHP</h1>
                <div>
                    <p onClick={() => { addOrder(food) }} >add 1</p>
                    <p onClick={() => { decrementOrder(food) }} style={{ color: "red" }} >sub 1</p>
                </div>
            </div>

        </div>
    )
}

export default Food