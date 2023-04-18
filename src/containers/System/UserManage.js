import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalCreatelUser from './ModalCreatelUser.js';
import ModalEditUser from './ModalEditUser.js';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalCreatelUser: false,
			userEdit: {},
			isOpenModalEditUser: false,
		};
	}

	async componentDidMount() {
		await this.getAllUsersFromReact()
	}

	getAllUsersFromReact = async () => {
		const response = await getAllUsers('ALL');
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	}

	handleAddNewUser = () => {
		this.setState({
			isOpenModalCreatelUser: true
		})
	}

	handleEditUser = async (user) => {
		try {
			this.setState({
				isOpenModalEditUser: true,
				userEdit: user
			})
		} catch (e) {
			console.log(e);
		}
	}

	handleSaveUser = async (user) => {
		try {
			const response = await editUserService(user)
			if (response && response.errCode !== 0) {
				alert(response.errMessage)
			} else {
				await this.getAllUsersFromReact()
				this.setState({
					isOpenModalEditUser: false
				})
			}
		} catch (e) {
			console.log(e);
		}
	}

	handleDeleteUser = async (user) => {
		try {
			const response = await deleteUserService(user.id)
			if (response && response.errCode === 0) {
				this.getAllUsersFromReact()
			} else {
				alert(response.errMessage)
			}
		} catch (e) {
			console.log(e);
		}
	}

	toggleCreateUserModal = () => {
		this.setState({
			isOpenModalCreatelUser: !this.state.isOpenModalCreatelUser
		})
	}

	toggleEditUserModal = () => {
		this.setState({
			isOpenModalEditUser: !this.state.isOpenModalEditUser
		})
	}

	createNewUser = async (data) => {
		try {
			const response = await createNewUserService(data)
			if (response && response.errCode !== 0) {
				alert(response.errMessage)
			} else {
				await this.getAllUsersFromReact()
				this.setState({
					isOpenModalCreatelUser: false
				})
				emitter.emit('EVENT_CLEAR_MODAL_DATA')
			}
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const arrUsers = this.state.arrUsers;
		return (
			<div className="users-container">
				<ModalCreatelUser
					isOpen={this.state.isOpenModalCreatelUser}
					toggleCreateUserModal={this.toggleCreateUserModal}
					createNewUser={this.createNewUser}
				/>
				{
					this.state.isOpenModalEditUser &&
					<ModalEditUser
						isOpen={this.state.isOpenModalEditUser}
						toggleEditUserModal={this.toggleEditUserModal}
						currentUser={this.state.userEdit}
						saveUser={this.handleSaveUser}
					/>					
				}
				<div className="title text-center">Manager users</div>
				<div className="mx-1">
					<button
					className="btn btn-primary px-3"
					onClick={() => this.handleAddNewUser()}
					>
						<i className="fas fa-plus"></i>
						Add new user
					</button>
				</div>
				<div className="users-table mt-4 mx-1">
					<table id="customers">
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
							{arrUsers &&
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
