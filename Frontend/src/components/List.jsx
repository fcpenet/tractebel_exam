import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { client } from '../actions';

class List extends Component {
  	state = {
  		name: '',
		telephone: '',
		clients: [],
		message: '',
		key: ''
	}
	
	onNameChange = (e) => {
		this.setState({name: e.target.value});
	}
	
	onKeyChange = (e) => {
		this.setState({key: e.target.value});
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

	search = () => {
		this.props.search(this.state.key);
	}

	componentWillReceiveProps = (nextProps) => {
		
		this.setState({clients: nextProps.clients});
		if(JSON.stringify(this.props.message) !== JSON.stringify(nextProps.message)){
			this.setState({message: nextProps.message});
		}
	}

	render(){	
		const {clients, message} = this.state;
		return (
		<div>
			{message &&
			<div>
				Error: {message}
			</div>
			}
			<div>
				<form className="List" onSubmit={this.onSubmit}>
					<input value={this.state.name} onChange={this.onNameChange} placeholder="Name" />
					<input value={this.state.telephone} onChange={this.onTelephoneChange} placeholder="Telephone" />
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
							<td>
								<Link to={{pathname: '/client/update', 
									query: { name: client.name, 
											telephone: client.telephone,
											id: client.id }}}>
									{client.name}
								</Link>
							</td>
							<td>{client.telephone}</td>
						</tr>
					)}
				</tbody></table>
					: "No clients to show!"
				}
			</div>
			<div>
				<form className="List">
					<input value={this.state.key} onChange={this.onKeyChange} placeholder="Search" />
				</form>
					<button onClick={this.search}>Search</button>			
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
		},
		search: (key) => {
			dispatch(client.search(key));
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(List);
