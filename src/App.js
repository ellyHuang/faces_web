import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import LinkInputForm from './Components/LinkInputForm/LinkInputForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOption = {
  particles: {
    number: {
      value: 80,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
};

const app = new Clarifai.App({
  apiKey: '59281e6f7e5f4cdbaba678279a8d3ec7',
 });

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser =  (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    })
  }

  facesLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  detectedFaces = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.input)
    .then( response => {
      if (response) {
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({id: this.state.user.id})
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
      }

      this.detectedFaces(this.facesLocation(response));

    })
    .catch( err => console.log(err) );
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignIn: true})
    }

    this.setState({route: route});
  }

  render() {
    return (
      <div className='app'>
        <Particles params={particlesOption} className='particles'/>
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn}/>
        { this.state.route === 'home' ?  
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <LinkInputForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
          :
          (this.state.route === 'signin')
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    )
  }
}

export default App;
