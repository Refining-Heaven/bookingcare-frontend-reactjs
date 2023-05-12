import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader'
import './InfoDoctor.scss'
import { LANGUAGES } from "../../../utils";

class InfoDoctor extends Component {
  constructor(props){
    super(props);
    this.state = {
      infoDoctor: {}
    }
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const id = this.props.match.params.id
      this.props.getInfoOfDoctor(id)
    }
	}

  componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.infoDoctor !== this.props.infoDoctor) {
			this.setState({
				infoDoctor: this.props.infoDoctor,
			});
		}
  }

	render() {
    const infoDoctor = this.state.infoDoctor
    console.log(infoDoctor);
    const language = this.props.language
    let nameVi = ''
    let nameEn = ''
    if (infoDoctor && infoDoctor.positionData) {
      nameVi = `${infoDoctor.positionData.valueVi}, ${infoDoctor.lastName} ${infoDoctor.firstName}`;
			nameEn = `${infoDoctor.positionData.valueEn}, ${infoDoctor.firstName} ${infoDoctor.lastName}`;
    }
    let imageBase64 = ''
    if (infoDoctor.image) {
      imageBase64 = new Buffer(infoDoctor.image, 'base64').toString('binary')
    }
		return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-info-container">
          <div className="intro-doctor">
            <div className="content-left" style={{ backgroundImage: `url(${imageBase64})`}}>
            </div>
            <div className="content-right">
              <div className="up">
                { language === LANGUAGES.VI ? nameVi : nameEn }
              </div>
              <div className="down">
                {infoDoctor.Markdown && infoDoctor.Markdown.description &&
                  <span>
                    {infoDoctor.Markdown.description}
                  </span>
                }
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            
          </div>
          <div className="detail-info-doctor">
            { infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.contentHTML &&
              <div dangerouslySetInnerHTML={{__html: infoDoctor.Markdown.contentHTML}}>
                
              </div>
            }
          </div>
          <div className="comment-doctor">
            
          </div>
        </div>
      </>
		);
	}
}

const mapStateToProps = (state) => {
	return {
    language: state.app.language,
    infoDoctor: state.admin.infoDoctor
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    getInfoOfDoctor: (doctorId) => dispatch(actions.getInfoOfDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoDoctor);
