import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

class HomePage extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slideToScroll: 1,
		};
		return (
      <div>
        <HomeHeader />
				<Specialty settings={settings} />
				<MedicalFacility settings={settings} />
				<OutStandingDoctor settings={settings} />
				<Handbook settings={settings} />
				<About />
				<HomeFooter />
      </div>
    )
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
