import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPwd: '',
            registerName: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onPwdChange = (event) => {
        this.setState({ registerPwd: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value })
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register',{
            method: 'post',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                pwd: this.state.registerPwd,
                name: this.state.registerName,
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        return (
            <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 center">Create An Account</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 center" htmlFor="name">Name</label>
                                <input 
                                    onChange = { this.onNameChange }
                                    className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 center" htmlFor="email-address">Email</label>
                                <input 
                                    onChange={ this.onEmailChange }
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 center" htmlFor="password">Password</label>
                                <input 
                                    onChange={ this.onPwdChange }
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="center">
                            <input onClick = { this.onSubmitRegister } className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        </div>
        )
    }
}

export default Register