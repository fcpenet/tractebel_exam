import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { client } from '../actions';

class Detail extends Component {
  	state = {
  		name: '',
		telephone: '',
		id: '',
	}
	
	onNameChange = (e) => {
		this.setState({name: e.target.value});
	}
	
	onTelephoneChange = (e) => {
		this.setState({telephone: e.target.value});
	}

	onSubmit = (event) => {
		event.preventDefault(); //this prevents the whole page to reload
		const {id, name, telephone} = this.state;
		this.props.updateClient(id, name, telephone);
		//redirect after
	}	

	componentDidMount = () => {
		const {id, name, telephone} = this.props.location.query
		this.setState({id: id, name: name, telephone: telephone});
	}

	render(){	
		
		if(this.props.shouldRedirect){
			return (<Redirect to='/' />);
		}

		return (
		<div>
			<div>
				<form className="Detail" onSubmit={this.onSubmit}>
					<input value={this.state.name} onChange={this.onNameChange} />
					<input value={this.state.telephone} onChange={this.onTelephoneChange} />
					<button>Update</button>			
				</form>
			</div>
		</div>
    	);
  }  
}

const mapStateToProps = state => {
	return {
		shouldRedirect: state.client.isDone,
	}
}

const mapDispatchToProps = dispatch => {
	return{
		updateClient: (id,name, telephone) => {
			dispatch(client.update(id, name, telephone));
		},
		deleteClient: (id) => {
			dispatch(client.delete(id));
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
