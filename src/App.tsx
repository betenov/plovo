import React, {useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import DishForm from "./components/DishForm/DishForm";
import Dishes from "./components/Dishes/Dishes";
import {CartDish, Dish} from "./types";
import Cart from "./components/Cart/Cart";
import Home from "./containers/Home/Home";
import NewDish from "./containers/NewDish/NewDish";


function App() {
  const [location,setLocation] = useState('home')


  const [dishes, setDishes] = useState<Dish[]> ([]);

  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);

  const addDish = (newDish:Dish) => {
    setDishes(prev => [...prev , newDish])
  };

  const addDishToCart = (dish:Dish) => {
    setCartDishes(prevState => {
      const existingIndex = prevState.findIndex(item => {
        return item.dish === dish
      });
      if (existingIndex !== -1){
        const itemsCopy = [...prevState];
        const itemCopy = {...prevState[existingIndex]};
        itemCopy.amount++;
        itemsCopy[existingIndex] =itemCopy;
        return itemsCopy;
      }
      return [...prevState, {dish, amount:1}]
    });
  };

  let content = null;
  if (location === 'home'){
    content = (
      <Home dishes={dishes} addToCart={addDishToCart} cartDishes={cartDishes}/>
    );
  }
  if (location === 'new-dish') {
    content = (
      <NewDish onCreate={addDish}/>
    );
  }
  return (
    <>
      <header>
        <NavBar changeLocation={setLocation}/>
      </header>
      <main className="container-fluid">
        {content}
      </main>
    </>
  );
}

export default App;
