import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

class TableManageUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
      userRedux: []
		};
	}

	componentDidMount() {
		this.props.fetchUserRedux();
	}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.usersList !== this.props.usersList) {
      this.setState({
        userRedux: this.props.usersList
      })
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id)
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user)
  }

	render() {
		const arrUsers = this.state.userRedux;
		return (
			<table id="TableManageUser">
				<thead>
					<tr>
						<th>Email</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Address</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{arrUsers && arrUsers.length > 0 &&
						arrUsers.map((user, index) => {
							return (
								<tr key={index}>
									<td>{user.email}</td>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.address}</td>
									<td>
										<button className="btn-edit" onClick={() => this.handleEditUser(user)}>
											<i className="fas fa-pencil-alt"></i>
										</button>
										<button className="btn-delete" onClick={() => this.handleDeleteUser(user)}>
											<i className="fas fa-trash"></i>
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
    usersList: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
