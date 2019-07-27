import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ReactStars from "react-stars";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 350,
    padding: "30px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

const Camera = props => {
  const classes = useStyles();

  const handleAdd = e => {
    props.addToCart(props.camera.id);
  };

  const price = "$" + props.camera.price;

  return (
    <Card className={classes.card}>
      <CardHeader title={props.camera.name} subheader={price} />
      <CardMedia
        className={classes.media}
        image={props.camera.picture}
        title="Camera"
        style={{
          maxWidth: "60%",
          height: "auto"
        }}
      />
      <p> In Stock? {props.camera.onSale === true ? "Yes" : "No"}</p>
      Customer Reviews:
      <ReactStars count={props.camera.rating} edit={false} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleAdd}
      >
        Add to Cart
        <AddShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Camera;
