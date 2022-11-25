import React, {useState} from 'react';
import CartItem from "./CartItem";
import {CartDish} from "../../types";
import Modal from "../Modal/Modal";

interface Props {
  cartDishes:CartDish[]
}

const Cart:React.FC<Props> = ({cartDishes}) => {
  const [showModal,setShowModal] = useState(false);


  const total = cartDishes.reduce((sum:number, cartDish) => {
    return sum + cartDish.amount *cartDish.dish.price;
    },0);

  let cart = (
    <div className="alert alert-primary">
      Cart is empty! Add something
    </div>
  );
  if (cartDishes.length > 0) {
    cart = (
      <>
        {cartDishes.map(cartDish => (
          <CartItem
            key={cartDish.dish.id}
            cartDish = {cartDish}
          />
        ))}
        <div className="card border-0 p-2" >
          <div className="row">
            <div className="col text-right">
              Total:
            </div>
            <div className="col-3 text-right">
              <strong>{total}</strong>KGS
            </div>
          </div>
        </div>
        <button className= "btn btn-primary" onClick={() => setShowModal(true)}>
          Order
        </button>
      </>
    );
  }

  const cansel = () => setShowModal(false)

  return (
    <>
      <h4>Cart</h4>
      {cart}
      <Modal show={showModal} title="Order" onClose={cansel}>
        <div className="modal-body">
          Content
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger"
          onClick={cansel}
          >
            Cancel
          </button>
        </div>


      </Modal>
    </>
  );
};

export default Cart;