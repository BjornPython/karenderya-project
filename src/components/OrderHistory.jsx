
function OrderHistory({ orderHistory }) {


    return (
        <div className='order-his-ctr'>
            <h1>Order History</h1>
            {orderHistory.map((order, index) => {
                return (
                    <div className="order-his" key={index}>
                        {Object.entries(order).map((vals) => {
                            const food = vals[0]
                            const qty = vals[1]

                            if (food === "totalPrice") {
                                console.log("QTY FOR PRICE: ", qty);
                                return (
                                    <div className="t-price">total: {qty}</div>
                                )
                            }
                            return (
                                <div className="order-his-info" key={food}>
                                    <p>{food}</p>
                                    <p>{qty}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default OrderHistory