import React, { Component }from 'react'
import ReactDOM from 'react-dom';
import ReactTableComponent from './ReactTableComponent.js';
import 'react-table/react-table.css';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Row} from "react-bootstrap";
const { UserServiceClient } = require('../grpc/crud_grpc_web_pb');
const { CreateUserReq, DeleteUserReqById, ListUsersReq, User} = require('../grpc/crud_pb');
let client =  new UserServiceClient('http://localhost:8080', null, null);
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false // Indicates in progress state of login form
    };
    this.getUsers(this);
  }

  //delete user
  deleteUser(id){

    const request = new DeleteUserReqById();

    console.log(id);
    request.setId(id);

    client.deleteUser(request,null,(err, response)=> {
      if (err) {
        console.log(err);

      } else {
        console.log(response);
      }
    })
  }

  //get all users from golang server
  getUsers (parent) {
    console.log('getUser');
    const request1 = new ListUsersReq();
    let res = client.listUsers(request1, null);

    res.on("data", onData);

    function onData(msg) {
      let user = msg.array;
      let id = user[0][0];
      let unm = user[0][4];
      let nm = user[0][1];
      let mnm = user[0][3];
      let lnm = user[0][2];
      let email = user[0][5];
      let cell = user[0][6];
      let { users } = parent.state;
      users.push({'id':id, 'username':unm, 'name' :nm, 'midname' :mnm,'lastname' :lnm, 'email' :email, 'cellnumber' :cell });
      parent.setState({
        users: users
      });
    }
  }
  //create user info
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const name = event.target.elements[1].value
    const midName = event.target.elements[2].value
    const lastName = event.target.elements[3].value
    const email = event.target.elements[4].value
    const cellNumber = event.target.elements[5].value

    console.log(userName);
    console.log(name);
    console.log(midName);
    console.log(lastName);
    console.log(email);
    console.log(cellNumber);

    const request = new CreateUserReq();
    const user = new User();
    user.setName(name);
    user.setMidName(midName);
    user.setLastName(lastName);
    user.setUserName(userName);
    user.setEmail(email);
    user.setCellNumber(cellNumber);
    user.setImgs('file.jpeg');
    request.setUser(user);

    client.createUser(request, {}, (err, response)=> {
      if (err) {
        console.log(err);

      } else {
        console.log(response);

        let user = response.array;
        let id = user[0][0];
        let unm = user[0][4];
        let nm = user[0][1];
        let mnm = user[0][3];
        let lnm = user[0][2];
        let email = user[0][5];
        let cell = user[0][6];
        let { users } = this.state;
        users.push({'id':id, 'username':unm, 'name' :nm, 'midname' :mnm,'lastname' :lnm, 'email' :email, 'cellnumber' :cell});
        this.setState({
          users: users
        });

      }
    });

  }


  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData
    });
  }

  render() {
    const { errors, formSubmitted } = this.state;
    const { users } = this.state;
    return <div className={'container'}>
        <form className={'row'} onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup className={'col-sm-4' } controlId="username" validationState={ formSubmitted ? (errors.username ? 'error' : 'success') : null }>
            <ControlLabel>User Name</ControlLabel>
            <FormControl type="text" name="username" placeholder="Enter your User Name" onChange={this.handleInputChange.bind(this)} />
            { errors.username &&
            <HelpBlock>{errors.username}</HelpBlock>
            }
          </FormGroup>
          <FormGroup className={'col-sm-4' } controlId="name" validationState={ formSubmitted ? (errors.name ? 'error' : 'success') : null }>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" name="name" placeholder="Enter your name" onChange={this.handleInputChange.bind(this)} />
            { errors.name &&
            <HelpBlock>{errors.name}</HelpBlock>
            }
          </FormGroup>

          <FormGroup className={'col-sm-4' } controlId="lastname" validationState={ formSubmitted ? (errors.lastname ? 'error' : 'success') : null }>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" name="lastname" placeholder="Enter your Last Name" onChange={this.handleInputChange.bind(this)} />
            { errors.lastname &&
            <HelpBlock>{errors.lastname}</HelpBlock>
            }
          </FormGroup>
          <FormGroup className={'col-sm-4' } controlId="midname" validationState={ formSubmitted ? (errors.midname ? 'error' : 'success') : null }>
            <ControlLabel>M. Name</ControlLabel>
            <FormControl type="text" name="midname" placeholder="Enter your M. Name" onChange={this.handleInputChange.bind(this)} />
            { errors.midname &&
            <HelpBlock>{errors.midname}</HelpBlock>
            }
          </FormGroup>

          <FormGroup className={'col-sm-4' } controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange.bind(this)} />
            { errors.email &&
            <HelpBlock>{errors.email}</HelpBlock>
            }
          </FormGroup>
          <FormGroup className={'col-sm-4' } controlId="cellnumber" validationState={ formSubmitted ? (errors.cellnumber ? 'error' : 'success') : null }>
            <ControlLabel>Cell Number</ControlLabel>
            <FormControl type="text" name="cellnumber" placeholder="Enter your Cell Number" onChange={this.handleInputChange.bind(this)} />
            { errors.cellnumber &&
            <HelpBlock>{errors.cellnumber}</HelpBlock>
            }
          </FormGroup>



          <Button type="submit" bsStyle="primary" className={'btn-create'}>Add</Button>

        </form>

      <ReactTableComponent users={users} onDelete={this.deleteUser} />

      <Button variant="contained" color="primary">
        Hello World
      </Button>

    </div>

  }
};

export default Home;
