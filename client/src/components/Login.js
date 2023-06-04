import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Validation from "./LoginValidation";
import ValidationJoin from "./SignupValidation";
import * as Components from './LoginComp';

export const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [values, setValues] = useState({
    nickname: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }
  const handleSubmitJoin = (event) => {
    event.preventDefault();
    setErrors(ValidationJoin(values));
    if(errors.nickname ==="" && errors.email === "" && errors.password === "") {
      axios.post('localhost:5050/join', values)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }
  
  return (
    <Components.Wrap>
      <Components.Container>
        <Components.SignUpContainer signinIn = {signIn}>
          <Components.Form onSubmit={handleSubmitJoin}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Name" name="nickname" required="" onChange={handleInput}/>
            {errors.nickname && <span className="text-danger"> {errors.nickname} </span>}
            <Components.Input type="email" placeholder="Email" name="email" required="" onChange={handleInput} />
            {errors.email && <span className="text-danger"> {errors.email} </span>}
            <Components.Input type="password" name="password" placeholder="Password" required="" onChange={handleInput} />
            {errors.password && <span className="text-danger"> {errors.password} </span>}
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>      
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn = {signIn}>
          <Components.Form action="/auth/join" onSubmit={handleSubmitLogin}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email"
            onChange={handleInput} name="email"/>
            {errors.email && <span className="text-danger"> {errors.email} </span>}
            <Components.Input type="password" placeholder="Password" name="password" onChange={handleInput}/>
            {errors.password && <span className="text-danger"> {errors.password} </span>}
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn = {signIn}>
          <Components.Overlay signinIn = {signIn}>

            <Components.LeftOverlayPanel signinIn = {signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                로그인하고 퀀티지가 제공하는<br></br>다양한 서비스를 경험하세요!
              </Components.Paragraph>
              <Components.GhostButton onClick = {() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn = {signIn}>
              <Components.Title>Hello, QuantEZ</Components.Title>
              <Components.Paragraph>
                세상에서 가장 쉬운 투자, QuantEZ
              </Components.Paragraph>
                <Components.GhostButton onClick = {() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
            </Components.RightOverlayPanel>
            

          </Components.Overlay>
        </Components.OverlayContainer>

      </Components.Container>
    </Components.Wrap>
  )
}