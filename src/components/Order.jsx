// Used to display the food and the quantity of an order.
function Order({ food, qty }) {
    return (
        <div className="food-order">
            <h1>{food}</h1>
            <h1>{qty}</h1>
        </div>
    )
}

export default Order