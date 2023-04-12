import "../styles/home.css"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import Orders from "./Orders"

const defaultMenu = {
    adobo: { price: 50, qty: 15 },
    rice: { price: 10, qty: 9999999 },
    kaldereta: { price: 60, qty: 12 },
    sisig: { price: 55, qty: 13 }
}

function Home() {
    const [currentMenu, setCurrentMenu] = useState(defaultMenu)
    const [orderHistory, setOrderHistory] = useState([])
    const [currentOrders, setCurrentOrders] = useState({})

    const [totalCost, setTotalCost] = useState(0)



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

    const updateFoodQty = (food, decrementVal) => { // Updates the food quantity when order is done.
        setCurrentMenu(prevMenu => {
            return { ...prevMenu, [food]: { ...prevMenu[food], qty: prevMenu[food].qty -= decrementVal } }
        })
    }



    return (
        <div className="home">
            <Menu currentMenu={currentMenu} addFood={addFood} addOrder={addOrder} />
            <Orders currentMenu={currentMenu} currentOrders={currentOrders} />
        </div>
    )
}

export default Home