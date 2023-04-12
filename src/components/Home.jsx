import "../styles/home.css"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import Orders from "./Orders"
import OrderHistory from "./OrderHistory"


const defaultMenu = {
    adobo: { price: 50, qty: 15 },
    rice: { price: 10, qty: 9999999 },
    kaldereta: { price: 60, qty: 12 },
    sisig: { price: 55, qty: 13 }
}

function Home() {

    // rerender attribute is used to rerender the state when nested values are changed.
    const [currentMenu, setCurrentMenu] = useState({ ...defaultMenu, rerender: 0 })
    const [orderHistory, setOrderHistory] = useState([])
    const [currentOrders, setCurrentOrders] = useState({})


    const addFood = (food, price, qty) => {
        setCurrentMenu(prevMenu => {
            return { ...prevMenu, [food]: { price, qty } }
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

    const updateMenu = () => { // Updates the food quantity when order is done.
        const updatedMenu = currentMenu
        Object.entries(currentOrders).map(vals => {
            console.log("FOOD: ", vals[0]);
            const food = vals[0]
            const newQty = currentMenu[food].qty - vals[1]
            updatedMenu[food].qty = newQty
            // setNewMenu({ ...currentMenu, [food]: { ...currentMenu[food], qty: newQty } })
        })
        console.log("NEWMENU: ", updatedMenu);
        setOrderHistory(prevHistory => { return [...prevHistory, currentOrders] })
        setCurrentOrders({})
        setCurrentMenu(prevState => { return { ...prevState, rerender: prevState.rerender += 1 } }) // rerender current Menu
    }



    return (
        <div className="home">
            <Menu currentMenu={currentMenu} addFood={addFood} addOrder={addOrder} />
            <Orders currentMenu={currentMenu} currentOrders={currentOrders} updateMenu={updateMenu} />
            <OrderHistory orderHistory={orderHistory} />
        </div>
    )
}

export default Home