import { useEffect } from "react"

function OrderHistory({ orderHistory }) {

    useEffect(() => {
        console.log("OHIS: ", orderHistory);
    }, [orderHistory])
    return (
        <div className='order-his-ctr'>
            <h1>Order History</h1>
            {orderHistory.map((order) => {
                return (
                    <div className="order-his">
                        {Object.entries(order).map((vals) => {
                            const food = vals[0]
                            const qty = vals[1]
                            console.log("FOOD: ", food, "QTY: ", qty);
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