import ReactTable from 'react-table';
import React, { Component } from 'react';


export default class ReactTableComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: true, // Indicates submit status of login form
            loading: true // Indicates in progress state of login form
        };

    }


    render() {

        const columns = [
            {
                Header: 'id',
                accessor: 'id',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'User Name',
                accessor: 'username',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Name',
                accessor: 'name',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'M. Name',
                accessor: 'midname',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Last Name',
                accessor: 'lastname',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Email',
                accessor: 'email',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: 'Cell Number',
                accessor: 'cellnumber',
                headerStyle: { whiteSpace: 'unset' },
                style: { whiteSpace: 'unset' },
            },
            {
                Header: "Edit",
                id:'update',
                accessor: "update",

                Cell: (row)=> (
                    <span style={{cursor:'pointer',color:'blue',textDecoration:'underline'}}
                          onClick={() => {
                              let data = this.props.users;
                              console.log(this.props.users[row.index]);

                              let user = this.props.users[row.index];

                              this.props.Update(user['id']);
                              data.splice(row.index, 1)
                              this.setState({data})
                          }}>     Edit
                    </span>


                )},
            {
                Header: "Delete",
                id:'delete',
                accessor: "delete",

                Cell: (row)=> (
                    <span style={{cursor:'pointer',color:'red',textDecoration:'underline'}}
                          onClick={() => {
                              let data = this.props.users;
                              console.log(this.props.users[row.index]);

                              let user = this.props.users[row.index];

                              this.props.onDelete(user['id']);
                              data.splice(row.index, 1)
                              this.setState({data})
                          }}>     Delete
                    </span>
                )}



        ];
        return (
            <div >
                <ReactTable
                    manual
                    minRows={0}
                    pageSize={1}
                    data={this.props.users}
                    columns={columns}
                    pages={0}
                    showPagination={true}
                />
            </div>
        );
    }

}
