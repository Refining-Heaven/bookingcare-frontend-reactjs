import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import './HomeHeader.scss';
import logo from '../../assets/logo.svg'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class HomeHeader extends Component {

	changeLanguage = (language) => {
		this.props.changeLanguageAppRedux(language)
	}

	render() {

		let language = this.props.language

		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<i className="fas fa-bars"></i>
							<img className="header-logo" src={logo} alt="" />
						</div>
						<div className="center-content">
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.speciality" /></b>
								</div>
								<div className="subs-title"><FormattedMessage id="home-header.search-doctor" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.health-facility" /></b>
								</div>
								<div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.select-room" /></b>
								</div>
								<div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.fee" /></b>
								</div>
								<div className="subs-title"><FormattedMessage id="home-header.check-health" /></div>
							</div>
						</div>
						<div className="right-content">
							<div className="support">
								<i className="fas fa-question-circle"></i>
								<FormattedMessage id="home-header.support" />
							</div>
							<div className={language === LANGUAGES.VI ? "language active" : "language"}>
								<span onClick={() => {this.changeLanguage(LANGUAGES.VI)}}>
									VI
								</span>
							</div>
							<div className={language === LANGUAGES.EN ? "language active" : "language"}>
								<span onClick={() => {this.changeLanguage(LANGUAGES.EN)}}>
									EN
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="home-header-banner">
					<div className="content-up">
						<div className="title-1"><FormattedMessage id="banner.title-1" /></div>
						<div className="title-2"><FormattedMessage id="banner.title-2" /></div>
						<div className="search">
							<i className="fas fa-search"></i>
							<input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
						</div>
					</div>
					<div className="content-down">
						<div className="options">
							<div className="option-child">
								<div className="icon-child">
									<i className="far fa-hospital"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-1" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-mobile-alt"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-2" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-procedures"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-3" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-flask"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-4" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-user-md"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-5" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-briefcase-medical"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child-6" /></div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
