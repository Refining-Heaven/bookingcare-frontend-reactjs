import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import './UserRedux.scss';

class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genderArr: [],
			positionArr: [],
			roleArr: [],
			previewImgURL: '',
			isOpen: false,

			userId: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			address: '',
			gender: '',
			position: '',
			role: '',
			avatar: '',

			action: CRUD_ACTIONS.CREATE,
		};
	}

	componentDidMount() {
		this.props.getGenderStart();
		this.props.getPositionStart();
		this.props.getRoleStart();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {
			const arrGenders = this.props.genderRedux;
			this.setState({
				genderArr: arrGenders,
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
			});
		}
		if (prevProps.positionRedux !== this.props.positionRedux) {
			const arrPositions = this.props.positionRedux;
			this.setState({
				positionArr: arrPositions,
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
			});
		}
		if (prevProps.roleRedux !== this.props.roleRedux) {
			const arrRoles = this.props.roleRedux;
			this.setState({
				roleArr: arrRoles,
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
			});
		}
		if (prevProps.usersList !== this.props.usersList) {
			const arrGenders = this.props.genderRedux;
			const arrPositions = this.props.positionRedux;
			const arrRoles = this.props.roleRedux;
			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				phoneNumber: '',
				address: '',
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
				position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
				avatar: '',
				previewImgURL: '',
				action: CRUD_ACTIONS.CREATE
			});
		}
	}

	handleOnChangeImage = async (event) => {
		const data = event.target.files;
		const file = data[0];
		if (file) {
			const base64 = await CommonUtils.getBase64(file)
			const objectUrl = URL.createObjectURL(file);
			this.setState({
				previewImgURL: objectUrl,
				avatar: base64,
			});
		}
	};

	openPreviewImage = () => {
		if (!this.state.previewImgURL) {
			return;
		} else {
			this.setState({
				isOpen: true,
			});
		}
	};

	handleSaveUser = () => {
		const isValid = this.checkValidateInput();
		const action = this.state.action;
		if (isValid === true && action === CRUD_ACTIONS.CREATE) {
			this.props.createNewUser({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phoneNumber: this.state.phoneNumber,
				gender: this.state.gender,
				position: this.state.position,
				role: this.state.role,
				avatar: this.state.avatar
			});
		}
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.editUser({
				id: this.state.userId,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phoneNumber: this.state.phoneNumber,
				gender: this.state.gender,
				position: this.state.position,
				role: this.state.role,
				avatar: this.state.avatar
			})
		}
	};

	onChangeInput = (event, id) => {
		const copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	checkValidateInput = () => {
		let isValid = true;
		const arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false;
				alert('This input is required: ' + arrCheck[i]);
				break;
			}
		}
		return isValid;
	};

	handleEditUserFromParent = (user) => {
		let imageBase64 = ''
		if (user.image) {
			imageBase64 = new Buffer(user.image, 'base64').toString('binary')
		}

		this.setState({
			email: user.email,
			password: 'none',
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			address: user.address,
			gender: user.gender,
			position: user.positionId,
			role: user.roleId,
			avatar: '',
			previewImgURL: imageBase64,
			action: CRUD_ACTIONS.EDIT,
			userId: user.id
		});
	};

	render() {
		const genders = this.state.genderArr;
		const positions = this.state.positionArr;
		const roles = this.state.roleArr;
		const language = this.props.language;
		const isGetGender = this.props.isLoadingGender;

		const { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

		return (
			<div className="user-redux-container">
				<div className="title">User Redux</div>
				<div className="user-redux-body">
					<div className="container">
						<div className="row">
							<div className="col-12 my-3">
								<FormattedMessage id="manage-user.add" />
							</div>
							<div className="col-12">{isGetGender === true ? 'Loading gender' : ''}</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.email" />
								</label>
								<input
									className="form-control"
									type="email"
									value={email}
									onChange={(event) => this.onChangeInput(event, 'email')}
									disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.password" />
								</label>
								<input
									className="form-control"
									type="password"
									value={password}
									onChange={(event) => this.onChangeInput(event, 'password')}
									disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.first-name" />
								</label>
								<input
									className="form-control"
									type="text"
									value={firstName}
									onChange={(event) => this.onChangeInput(event, 'firstName')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.last-name" />
								</label>
								<input
									className="form-control"
									type="text"
									value={lastName}
									onChange={(event) => this.onChangeInput(event, 'lastName')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.phone-number" />
								</label>
								<input
									className="form-control"
									type="text"
									value={phoneNumber}
									onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
								/>
							</div>
							<div className="col-9">
								<label>
									<FormattedMessage id="manage-user.address" />
								</label>
								<input
									className="form-control"
									type="text"
									value={address}
									onChange={(event) => this.onChangeInput(event, 'address')}
								/>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.gender" />
								</label>
								<select
									className="form-control"
									value={gender}
									onChange={(event) => this.onChangeInput(event, 'gender')}
								>
									{genders &&
										genders.length > 0 &&
										genders.map((gender, index) => {
											return (
												<option key={index} value={gender.key}>
													{language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.position" />
								</label>
								<select
									className="form-control"
									value={position}
									onChange={(event) => this.onChangeInput(event, 'position')}
								>
									{positions &&
										positions.length > 0 &&
										positions.map((position, index) => {
											return (
												<option key={index} value={position.key}>
													{language === LANGUAGES.VI ? position.valueVi : position.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.role" />
								</label>
								<select className="form-control" value={role} onChange={(event) => this.onChangeInput(event, 'role')}>
									{roles &&
										roles.length > 0 &&
										roles.map((role, index) => {
											return (
												<option key={index} value={role.key}>
													{language === LANGUAGES.VI ? role.valueVi : role.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-3">
								<label>
									<FormattedMessage id="manage-user.avatar" />
								</label>
								<div className="preview-img-container">
									<input
										id="previewImg"
										type="file"
										value={''}
										hidden
										onChange={(event) => this.handleOnChangeImage(event)}
									/>
									<label className="label-upload" htmlFor="previewImg">
										Tải ảnh <i className="fas fa-upload"></i>
									</label>
									<div
										className="preview-image"
										style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
										onClick={() => this.openPreviewImage()}
									></div>
								</div>
							</div>
							<div className="col-12 my-3">
								<button
									className={this.state.action === CRUD_ACTIONS.CREATE ? 'btn btn-primary' : 'btn btn-warning'}
									onClick={() => this.handleSaveUser()}
								>
									{this.state.action === CRUD_ACTIONS.CREATE ? (
										<FormattedMessage id="manage-user.create-user" />
									) : (
										<FormattedMessage id="manage-user.save-changes" />
									)}
								</button>
							</div>
							<div className="col-12 mb-5">
								<TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action} />
							</div>
						</div>
					</div>
				</div>
				{this.state.isOpen === true && (
					<Lightbox mainSrc={this.state.previewImgURL} onCloseRequest={() => this.setState({ isOpen: false })} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoadingGender: state.admin.isLoadingGender,
		genderRedux: state.admin.genders,
		positionRedux: state.admin.positions,
		roleRedux: state.admin.roles,
		usersList: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getPositionStart: () => dispatch(actions.fetchPositionStart()),
		getRoleStart: () => dispatch(actions.fetchRoleStart()),
		createNewUser: (data) => dispatch(actions.createNewUser(data)),
		editUser: (data) => dispatch(actions.editUser(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
