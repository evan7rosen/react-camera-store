import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoney from "@material-ui/icons/AttachMoney";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 350
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

const Cart = props => {
  const classes = useStyles();

  const cartMap = props.cartList.map(cartItem => {
    const handleRemove = e => {
      props.removeFromCart(cartItem.camera.id);
    };

    const price = "$" + cartItem.camera.price;

    return (
      <Card key={cartItem.id} className={classes.card}>
        <CardHeader title={cartItem.camera.name} subheader={price} />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleRemove}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </Card>
    );
  });

  const cartTotal = () =>
    props.cartList.reduce(
      (total, cartItem) => total + cartItem.camera.price,
      0
    );

  const checkout = () => {
    if (
      window.confirm(
        `Subtotal: $${cartTotal().toFixed(2)}
      Tax: 8.6%
      Total: $${(cartTotal() * 1.086).toFixed(2)}
      
      Submit Order?`
      )
    ) {
      props.clearCart();
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h3>Your Cart</h3>
      {cartMap}
      Cart Total: ${cartTotal().toFixed(2)}
      <p>
        {" "}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={checkout}
        >
          Checkout
          <AttachMoney />
        </Button>
      </p>
    </div>
  );
};

Cart.propTypes = {
  clearCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cartList: PropTypes.array.isRequired
};

export default Cart;
