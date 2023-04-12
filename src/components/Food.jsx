import React from 'react'

function Food({ food, price, qty = null }) {
    console.log("QTY: ", qty);
    return (
        <div className='food-container'>

            <div className='food-qty'>
                <h1>{food}</h1>
                {qty ? <p>left: {qty}</p> : <></>}
            </div>

            <h1>{price} PHP</h1>

        </div>
    )
}

export default Food