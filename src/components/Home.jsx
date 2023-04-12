import "../styles/home.css"
import { useState } from "react"
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
    const [currentOrders, setCurrentOrders] = useState([])

    const [totalCost, setTotalCost] = useState(0)

    const addFood = (food, price, qty) => {
        setCurrentMenu(prevMenu => {
            return { ...prevMenu, [food]: { price, qty } }
        })
    }


    return (
        <div className="home">
            <Menu currentMenu={currentMenu} addFood={addFood} />
            <Orders orderHistory={orderHistory} />
        </div>
    )
}

export default Home