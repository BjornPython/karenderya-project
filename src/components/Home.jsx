import "../styles/home.css"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import Orders from "./Orders"
import OrderHistory from "./OrderHistory"
import { getMenu, getOrderHistory, updateDbMenu, updateOrderHistory } from "../apis/firebase"



function Home() {

    getOrderHistory()
    // rerender attribute is used to rerender the state when nested values are changed.
    const [currentMenu, setCurrentMenu] = useState(null) // The current Menu.
    const [orderHistory, setOrderHistory] = useState([]) // The history of the all the orders.
    const [currentOrders, setCurrentOrders] = useState({}) // The current orders.
    const [isInitialVals, setIsInitialVals] = useState(true) // Used to check if values are still initial.

    useEffect(() => {
        // Request initial values from firestore.
        const initializeVals = async () => {
            const menu = await getMenu()
            const orderHistoryData = await getOrderHistory()
            setCurrentMenu({ ...menu, rerender: 0 })
            setOrderHistory(orderHistoryData)
            setIsInitialVals(false)
        }
        initializeVals()
    }, [])

    useEffect(() => {
        // Used to update the database when a 
        // new food is added to the menu
        if (isInitialVals) { return }
        updateDbMenu(currentMenu)
    }, [currentMenu])

    // Adds a food to the menu
    const addFood = (food, price, qty) => {
        setCurrentMenu(prevMenu => {
            return { ...prevMenu, [food]: { price: parseInt(price), qty: parseInt(qty) } }
        })
    }

    // Adds a food to the order.
    const addOrder = (food) => {
        try {
            if (currentOrders[food]) { // Check if food is already in currentOrders

                setCurrentOrders(prevOrders => { // Increment food qty if already in currentOrders
                    const newOrders = { ...prevOrders };
                    if (newOrders[food] >= currentMenu[food].qty) { return prevOrders }
                    newOrders[food] += 1;
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
                setCurrentOrders(prevOrders => { // Decrement food qty if already in currentOrders
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


    // Updates the food quantity when order is done.
    const updateMenu = (totalPrice) => {
        const updatedMenu = currentMenu
        Object.entries(currentOrders).map(vals => {
            const food = vals[0]
            const newQty = currentMenu[food].qty - vals[1]
            updatedMenu[food].qty = newQty
        })

        updateDbMenu(updatedMenu) // Update Firestore Menu document
        updateOrderHistory({ ...currentOrders, totalPrice }) // Update Firestore orderHistory document

        setOrderHistory(prevHistory => { return [...prevHistory, { ...currentOrders, totalPrice }] }) // Adds the orders and totalPrice to orderHistory.
        setCurrentOrders({}) // Clears the current orders
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