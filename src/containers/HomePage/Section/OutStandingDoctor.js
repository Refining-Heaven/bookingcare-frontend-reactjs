import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
			this.setState({
				arrDoctors: this.props.topDoctorsRedux,
			});
		}
	}

	componentDidMount() {
		this.props.loadTopDoctors();
	}

	handleViewInfoDoctor = (doctor) => {
		this.props.history.push(`/info-doctor/${doctor.id}`)
	}

	render() {
		const language = this.props.language;
		const arrDoctors = this.state.arrDoctors;
		return (
			<div className="section-share section-out-standing-doctor">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">
							<FormattedMessage id="homepage.outstanding-doctor" />
						</span>
						<button className="btn-section">
							<FormattedMessage id="homepage.more-info" />
						</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.settings}>
							{arrDoctors &&
								arrDoctors.length > 0 &&
								arrDoctors.map((doctor, index) => {
									let imageBase64 = '';
									if (doctor.image) {
										imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
									}
									const nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
									const nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
									return (
										<div className="section-customize" key={index} onClick={() => this.handleViewInfoDoctor(doctor)}>
											<div className="customize-border">
												<div className="outer-bg">
													<div
														className="bg-image section-out-standing-doctor"
														style={{ backgroundImage: `url(${imageBase64})` }}
													></div>
												</div>
												<div className="position text-center">
													<div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
													<div>Cơ xương khớp 1</div>
												</div>
											</div>
										</div>
									);
								})}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoggedIn: state.user.isLoggedIn,
		topDoctorsRedux: state.admin.topDoctors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
