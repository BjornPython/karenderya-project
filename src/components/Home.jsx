import "../styles/home.css"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import Orders from "./Orders"
import OrderHistory from "./OrderHistory"
import { getMenu, updateDbMenu } from "../apis/firebase"



function Home() {

    getMenu()

    // rerender attribute is used to rerender the state when nested values are changed.
    const [currentMenu, setCurrentMenu] = useState(null)
    const [orderHistory, setOrderHistory] = useState([])
    const [currentOrders, setCurrentOrders] = useState({})
    const [isInitialVals, setIsInitialVals] = useState(true)

    useEffect(() => {
        const callGetFoods = async () => {
            const menu = await getMenu()
            setCurrentMenu({ ...menu, rerender: 0 })
            setIsInitialVals(false)
        }
        callGetFoods()
    }, [])

    useEffect(() => {
        if (isInitialVals) { return }
        updateDbMenu(currentMenu)
    }, [currentMenu])

    const addFood = (food, price, qty) => {
        setCurrentMenu(prevMenu => {
            return { ...prevMenu, [food]: { price: parseInt(price), qty: parseInt(qty) } }
        })
    }

    const addOrder = (food) => {
        try {
            if (currentOrders[food]) { // Check if food is already in currentOrders
                setCurrentOrders(prevOrders => { // Increment food qty if already in currentOrders
                    const newOrders = { ...prevOrders };
                    if (newOrders[food]) {
                        newOrders[food] += 1;
                    }
                    return newOrders
                })
            } else { // If food is not in yet un currentOrders
                setCurrentOrders(prevOrders => {
                    return { ...prevOrders, [food]: 1 } // Add the food in the currentOrders
                })
            }
        } catch (err) { throw err }
    }

    const decrementOrder = (food) => {
        try {
            if (currentOrders[food]) { // Check if food is already in currentOrders
                setCurrentOrders(prevOrders => { // Increment food qty if already in currentOrders
                    const newOrders = { ...prevOrders };
                    if (newOrders[food]) {
                        if (newOrders[food] <= 1) {
                            delete newOrders[food]
                        } else { newOrders[food] -= 1; }
                    }
                    return newOrders
                })
            }
        } catch (err) { throw err }
    }

    const updateMenu = () => { // Updates the food quantity when order is done.
        const updatedMenu = currentMenu
        Object.entries(currentOrders).map(vals => {
            const food = vals[0]
            const newQty = currentMenu[food].qty - vals[1]
            updatedMenu[food].qty = newQty
        })

        updateDbMenu(updatedMenu) // Update Firestore

        setOrderHistory(prevHistory => { return [...prevHistory, currentOrders] })
        setCurrentOrders({})
        setCurrentMenu(prevState => { return { ...prevState, rerender: prevState.rerender += 1 } }) // rerender current Menu
    }



    return (
        <div className="home">
            <Menu currentMenu={currentMenu} addFood={addFood} addOrder={addOrder} decrementOrder={decrementOrder} />
            <Orders currentMenu={currentMenu} currentOrders={currentOrders} updateMenu={updateMenu} />
            <OrderHistory orderHistory={orderHistory} />
        </div>
    )
}

export default Home