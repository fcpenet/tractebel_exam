import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { client } from '../actions';

class List extends Component {
  	state = {
  		name: '',
		telephone: '',
		clients: [],
		message: ''
	}
	
	onNameChange = (e) => {
		this.setState({name: e.target.value});
	}
	
	onTelephoneChange = (e) => {
		this.setState({telephone: e.target.value});
	}

	onSubmit = (event) => {
		event.preventDefault(); //this prevents the whole page to reload
		const {name, telephone} = this.state;
		this.props.createClient(name, telephone);
		this.props.getClients();	
	}	

	componentDidMount = () => {
		this.props.getClients();	
	}

	componentWillReceiveProps = (nextProps) => {
		if(JSON.stringify(this.props.clients) !== JSON.stringify(nextProps.clients)){
			this.setState({clients: nextProps.clients});
		}
		if(JSON.stringify(this.props.message) !== JSON.stringify(nextProps.message)){
			this.setState({message: nextProps.message});
		}
	}

	render(){	
		const {clients, message} = this.state;
		console.log(message);
		return (
		<div>
			{message &&
			<div>
				Error: {message}
			</div>
			}
			<div>
				<form className="List" onSubmit={this.onSubmit}>
					<input value={this.state.name} onChange={this.onNameChange} />
					<input value={this.state.telephone} onChange={this.onTelephoneChange} />
					<button>Create</button>			
				</form>
			</div>
			
			<div>
				{clients.length > 0 ?
				<table><tbody>
					<tr>
						<th>Name</th>
						<th>Telephone</th>
					</tr>
					{clients.map((client) => 
						<tr key = {client.id}>
							<td>{client.name} </td>
							<td>{client.telephone}</td>
						</tr>
					)}
				</tbody></table>
					: "No clients to show!"
				}
			</div>
		</div>
    	);
  }  
}

const mapStateToProps = state => {
	return {
		clients: state.client.clients,
		message: state.client.message
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getClients: () => {
			dispatch(client.getAll());
		},
		createClient: (name, telephone) => {
			dispatch(client.create(name, telephone));
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(List);
