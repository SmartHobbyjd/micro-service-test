import React, { Component }from 'react';
import { browserHistory } from 'react-router'
const { UserServiceClient } = require('../grpc/crud_grpc_web_pb');
const { ListUsersReq} = require('../grpc/crud_pb');
let client =  new UserServiceClient('http://localhost:8080', null, null);
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

class Login extends Component {
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

  getUsers (parent) {
    console.log('getUser');
    const request1 = new ListUsersReq();
    let res = client.listUsers(request1, null);

    res.on("data", onData);

    function onData(msg) {
      let user = msg.array;
      let id = user[0][0];
      let unm = user[0][1];
      let pwd = user [0][2];
      let { users } = parent.state;
      users.push({'id':id, 'username':unm,'password': pwd});
      parent.setState({
        users: users
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const password = event.target.elements[1].value
    console.log('handler');
    let result = false;
    const { users } = this.state;
    console.log(users);
    for(let i=0; i<users.length;i++){

      let user = users[i];

      if(user['username'] == userName){

        result = true;
        break;
      }
    }
    if(result) {
      const path = `/`
      console.log(path)
      browserHistory.push(path)
    }
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
    return (
      <div className={'Login'}>
        <Row>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="username" validationState={ formSubmitted ? (errors.username ? 'error' : 'success') : null }>
              <ControlLabel>User Name</ControlLabel>
              <FormControl type="text" name="username" placeholder="Enter your User Name" onChange={this.handleInputChange.bind(this)} />
              { errors.username &&
              <HelpBlock>{errors.username}</HelpBlock>
              }
            </FormGroup>
            <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange.bind(this)} />
              { errors.password &&
              <HelpBlock>{errors.password}</HelpBlock>
              }
            </FormGroup>
            <Button type="submit" bsStyle="primary">Login</Button>
          </form>
        </Row>
        {this.props.children}
      </div>
    )
  }
};
export default Login;
