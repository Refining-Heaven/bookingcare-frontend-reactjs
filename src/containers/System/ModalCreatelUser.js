import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalCreatelUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
		};
		this.listenToEmitter();
	}

	listenToEmitter() {
		emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
			});
		});
	}

	componentDidMount() {}

	toggle = () => {
		this.props.toggleCreateUserModal();
	};

	handleOnChangeInput = (event, id) => {
		const copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};

	checkValidateInput = () => {
		let isValid = true;
		const arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert('Missing parameter: ' + arrInput[i]);
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = () => {
		const isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.createNewUser(this.state);
		}
	};

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => {
					this.toggle();
				}}
				className={'modal-user-container'}
				size="lg"
				centered
			>
				<ModalHeader
					toggle={() => {
						this.toggle();
					}}
				>
					Create a new user
				</ModalHeader>
				<ModalBody>
					<div className="modal-user-body">
						<div className="input-container">
							<label>Email</label>
							<input
								type="email"
								placeholder="Email"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'email');
								}}
								value={this.state.email}
							/>
						</div>
						<div className="input-container">
							<label>Password</label>
							<input
								type="password"
								placeholder="Password"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'password');
								}}
								value={this.state.password}
							/>
						</div>
						<div className="input-container">
							<label>First name</label>
							<input
								type="text"
								placeholder="First name"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'firstName');
								}}
								value={this.state.firstName}
							/>
						</div>
						<div className="input-container">
							<label>Last name</label>
							<input
								type="text"
								placeholder="Last name"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'lastName');
								}}
								value={this.state.lastName}
							/>
						</div>
						<div className="input-container max-width-input">
							<label>Address</label>
							<input
								type="text"
								placeholder="Address"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'address');
								}}
								value={this.state.address}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						className="px-3"
						onClick={() => {
							this.handleAddNewUser();
						}}
					>
						Add new
					</Button>{' '}
					<Button
						color="secondary"
						className="px-3"
						onClick={() => {
							this.toggle();
						}}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatelUser);
