import React from "react";
import TopNav from "./components/TopNav";
import CameraList from "./components/CameraList";
import Cart from "./components/Cart";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

class App extends React.Component {
  state = {
    cameraList: [],
    cartList: [],
    cartItemId: 0
  };

  componentDidMount() {
    fetch(`http://localhost:8082/api/cameras`)
      .then(response => response.json())
      .then(data => this.setState({ cameraList: data }));
  }

  addToCart = cameraId => {
    if (
      !this.state.cartList.find(cartItem => cartItem.camera.id === cameraId)
    ) {
      const newCartItem = {
        camera: this.state.cameraList.find(camera => camera.id === cameraId),
        quantity: 1,
        id: this.state.cartItemId + 1
      };
      this.setState({
        cartList: [...this.state.cartList, newCartItem],
        cartItemId: newCartItem.id
      });
    }
  };

  removeFromCart = cameraId => {
    this.setState({
      cartList: this.state.cartList.filter(
        cartItem => cartItem.camera.id !== cameraId
      )
    });
  };

  clearCart = () => this.setState({ cartList: [] });

  render() {
    return (
      <div>
        <TopNav />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CameraList
                cameraList={this.state.cameraList}
                addToCart={this.addToCart}
              />
            </Grid>
            <Grid item xs={6}>
              <Cart
                cartList={this.state.cartList}
                removeFromCart={this.removeFromCart}
                clearCart={this.clearCart}
                cartItemId={this.state.cartItemId}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
