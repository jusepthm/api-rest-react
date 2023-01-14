import React from 'react';
//css
import '../assetss/css/Login.css';
//imagen
import Logo from '../assetss/img/login.png';
//servicaios
import { Apiurl } from '../services/apirest';
//librerias
import axios from 'axios';

class Login extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        form: {
            "usuario": "",
            "password": ""
        },
        error: false,
        errorMsg: ""
    }

    manejadorSubmit = e => {
        e.preventDefault();

    }

    manejadorChance = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    manejadorBoton = () => {
        let url = Apiurl + "auth";
        axios.post(url, this.state.form)
            .then(response => {
                if(response.data.status === "ok"){
                    localStorage.setItem("token",response.data.result.token)
                    this.props.history.push("/dashboard");
                }else{
                    this.setState({
                        error : true,
                        errorMsg : response.data.result.error_msg
                    })
                }
            }).catch(error =>{
                console.log(error);
                this.setState({
                        error : true,
                        errorMsg : "Error: Al conectar a la api"
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <br /><br />
                            <img src={Logo} width="100px" alt="User Icon" />
                        </div>


                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" class="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChance} />
                            <input type="password" class="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChance} />
                            <input type="submit" class="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
                        </form>

                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;