
function Order({ food, qty }) {
    return (
        <div className="food-order">
            <h1>{food}</h1>
            <h1>{qty}</h1>
        </div>
    )
}

export default Order