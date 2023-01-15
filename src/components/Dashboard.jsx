import React from 'react';
import Header from '../template/Header';
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component {

    state={
        pacientes: []
    }

    clickPaciente(id){
        console.log(id);
    }

    componentDidMount() {
        let url = Apiurl + "pacientes?page=1";
        axios.get(url)
            .then(response => {
                this.setState({
                    pacientes: response.data
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br /><br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">DNI</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col">CORREO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pacientes.map((value, index) => {
                                return (
                                    <tr key={index} onClick={()=>this.clickPaciente(value.PacienteId)}>
                                        <td>{value.PacienteId}</td>
                                        <td>{value.Nombre}</td>
                                        <td>{value.DNI}</td>
                                        <td>{value.Telefono}</td>
                                        <td>{value.Correo}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        );
    }
}

export default Dashboard;