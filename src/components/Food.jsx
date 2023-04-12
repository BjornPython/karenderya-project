
function Food({ food, price, addOrder, decrementOrder, qty = null }) {
    if (food === "rerender") { return } // so rerender key does not get included.
    return (
        <div className='food-container' style={qty <= 0 ? { color: "gray" } : { color: "white" }}>

            <div className='food-qty'>
                <h1 >{food}</h1>
                {qty && <p>left: {qty}</p>} {/* Displays the quantity if it is given */}
            </div>

            <div className='price-add'>
                <h3>{price} PHP</h3>
                <div style={qty <= 0 ? { display: "none" } : {}}>
                    <p onClick={() => { addOrder(food) }} >add 1</p>
                    <p onClick={() => { decrementOrder(food) }} style={{ color: "red" }} >sub 1</p>
                </div>
            </div>

        </div>
    )
}

export default Food