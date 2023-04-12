import { useState } from 'react'
import Food from './Food'


function Menu({ currentMenu, addFood, addOrder, decrementOrder }) {

    const [showAddFood, setShowAddFood] = useState(false) // if true, Shows an input so user can add food to Menu.

    const [newFoodVals, setNewFoodVals] = useState({ food: "", price: 0, qty: 0 }) // The input values for the new food. 
    const { food, price, qty } = newFoodVals

    if (!currentMenu) { return } // Returns if currentMenu is still not initialized.

    // Handles input values Changes
    const handleInputChange = (e) => {
        setNewFoodVals(prevVals => {
            return { ...prevVals, [e.target.name]: e.target.value }
        })
    }

    //Adds food to menu, and clears the input.
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
                return (<Food key={vals[0]} food={vals[0]} price={vals[1].price} qty={vals[1].qty} addOrder={addOrder} decrementOrder={decrementOrder} />)
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