
function OrderHistory({ orderHistory }) {

    // Displays all the past orders.

    return (
        <div className='order-his-ctr'>
            <h1>Order History</h1>
            {orderHistory.map((order, index) => {
                console.log("INDEX: ", index);
                return (
                    <div className="order-his" key={`ohis ${index}`}>
                        {Object.entries(order).map((vals) => {
                            const food = vals[0]
                            const qty = vals[1]

                            if (food === "totalPrice") { // Returns a div to display the total price.
                                return (
                                    <div key={`t ${index}`} className="t-price">total: {qty}</div>
                                )
                            } else { // Returns a div to display the foodname and ordered quantity.
                                return (
                                    <div className="order-his-info" key={food}>
                                        <p>{food}</p>
                                        <p>{qty}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default OrderHistory