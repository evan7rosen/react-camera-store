import React from "react";
import Camera from "./Camera";
import TextField from "@material-ui/core/TextField";

class CameraList extends React.Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const cameraMapFilter = this.props.cameraList
      .filter(camera =>
        camera.name.toLowerCase().includes(this.state.search.toLowerCase())
      )
      .map(camera => (
        <Camera
          key={camera.id}
          camera={camera}
          addToCart={this.props.addToCart}
        />
      ));

    return (
      <div>
        <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 8 }}
          helperText="Search by Camera Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <h1>Cameras For Sale</h1>
        {cameraMapFilter}
      </div>
    );
  }
}

export default CameraList;
