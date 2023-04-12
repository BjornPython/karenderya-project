import { useEffect } from "react"

function OrderHistory({ orderHistory }) {

    useEffect(() => {
        console.log("OHIS: ", orderHistory);
    }, [orderHistory])
    return (
        <div className='order-his-ctr'>
            {orderHistory.map((order) => {
                return (
                    <>
                        {Object.entries(order).map((vals) => {
                            const food = vals[0]
                            const qty = vals[1]
                            console.log("FOOD: ", food, "QTY: ", qty);
                            return (
                                <div>
                                    <h1>{food}</h1>
                                    <h1>{qty}</h1>
                                </div>
                            )
                        })}
                    </>
                )
            })}
        </div>
    )
}

export default OrderHistory