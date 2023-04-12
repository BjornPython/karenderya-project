import { useState } from 'react'
import Food from './Food'


function Menu({ currentMenu, addFood }) {

    const [showAddFood, setShowAddFood] = useState(false)

    const [newFoodVals, setNewFoodVals] = useState({ food: "", price: 0, qty: 0 })
    const { food, price, qty } = newFoodVals

    const handleInputChange = (e) => {
        setNewFoodVals(prevVals => {
            return { ...prevVals, [e.target.name]: e.target.value }
        })
    }

    const handleAddFood = () => {
        addFood(food, price, qty)
        setShowAddFood(false)
        setNewFoodVals({ food: "", price: 0, qty: 0 })
    }

    return (
        <div className='menu-container'>

            <p className='add-menu-btn' onClick={() => { setShowAddFood(!showAddFood) }} >
                {!showAddFood ? "Add food item" : "cancel"}</p>

            {Object.entries(currentMenu).map((vals) => {
                return (<Food key={vals[0]} food={vals[0]} price={vals[1].price} qty={vals[1].qty} />)
            })}

            {showAddFood &&
                <div className='addfood-ctr'>
                    <input type="text" name="food" val={food} placeholder='food' onChange={handleInputChange} />
                    <input type="text" name="price" val={price} placeholder='price' onChange={handleInputChange} />
                    <input type="text" name="qty" val={qty} placeholder='qty' onChange={handleInputChange} />
                    <button onClick={handleAddFood}>add</button>
                </div>
            }

        </div>
    )
}

export default Menu