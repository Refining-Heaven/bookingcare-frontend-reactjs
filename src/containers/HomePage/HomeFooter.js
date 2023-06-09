import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
	render() {
		return (
			<div className="home-footer">
        <p>&copy; 2023 Lucilius. More info, please <a target="_blank" rel="noreferrer" href="https://github.com/Refining-Heaven">click here</a></p>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
