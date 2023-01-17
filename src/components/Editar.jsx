import React from 'react';
import {Apiurl} from '../services/apirest';
//libreria
import axios from 'axios';
//template
import Header from '../template/Header';



class Editar extends React.Component{
   
    state = {
        form:{
            "nombre" : "",
            "direccion": "",
            "dni" : "",
            "correo":"",
            "codigoPostal" :"",
            "genero" : "",
            "telefono" : "",
            "fechaNacimiento" : "",
            "token" : "" ,
            "pacienteId" : ""
        },
        error:false,
        errorMsg:""
    }

    manejadorChance = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    put =()=>{
        console.log(this.state.form);
        let url = Apiurl + "pacientes";
        axios.put(url,this.state.form)
        .then(response=>{
            console.log(response);
        })
    }

    manejadorSubmit = e=>{
        e.preventDefault();
    }

    componentDidMount(){
        let pacienteId = this.props.match.params.id;
        let url = Apiurl + "/pacientes?id=" + pacienteId;
        axios.get(url)
        .then(response =>{
            this.setState({
                form:{
                    nombre : response.data[0].Nombre,
                    direccion: response.data[0].Direccion,
                    dni : response.data[0].DNI,
                    correo:response.data[0].Correo,
                    codigoPostal :response.data[0].CodigoPostal,
                    genero : response.data[0].Genero,
                    telefono : response.data[0].Telefono,
                    fechaNacimiento : response.data[0].FechaNacimiento,
                    token : localStorage.getItem("token") ,
                    pacienteId : pacienteId
                }
            })
        })
    }

    render(){const form = this.state.form

        return(
            <React.Fragment>
                <Header />
                <div className="container">
                    <h3>Editar paciente</h3>
                </div>
                <br />
                <div className="container">
                    <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <label className='col-md-2 control label'>Nombre</label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" name="nombre" placeholder='nombre' 
                                        value={form.nombre}
                                        onChange={this.manejadorChance} />
                                        
                                    </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className='col-md-2 control label'>Direccion</label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" name="direccion" placeholder='direccion'
                                        value={form.direccion}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>DNI</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="dni" placeholder='dni'
                                        value={form.dni}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        
                        
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>Telefono</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="telefono" placeholder='telefono'
                                        value={form.telefono}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        
                        
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>Codigo Postal</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="codigoPostal" placeholder='codigoPostal'
                                        value={form.codigoPostal}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        
                        
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>Fecha Nacimiento</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="fechaNacimiento" placeholder='fechaNacimiento'
                                        value={form.fechaNacimiento}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        
                        
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>genero</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="genero" placeholder='genero'
                                        value={form.genero} 
                                        onChange={this.manejadorChance}/>
                                    </div>
                            </div>
                        
                            <div className="col-sm-6">
                                <label className='col-md-2 control label'>Correo</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" name="correo" placeholder='correo'
                                        value={form.correo}
                                        onChange={this.manejadorChance} />
                                    </div>
                            </div>
                        </div>
                        <br /><br />
                            <button type="sunmit" className="btn btn-primary" style={{marginRight:"10px"}} onClick={()=>this.put()} >Editar</button>
                            <button type="sunmit" className="btn btn-danger" style={{marginRight:"10px"}}>Eliminar</button>
                            <a href="/dashboard" className="btn btn-dark">Salir</a>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Editar;