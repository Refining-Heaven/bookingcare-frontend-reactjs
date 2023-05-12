import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

// HTML to text
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentHTML: '',
			contentMarkdown: '',
			selectedOption: '',
			description: '',
			listDoctors: [],
			infoDoctor: {},
			hasOldData: false
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
	}

	buildDataInputSelect = (inputData) => {
		const result = [];
		const language = this.props.language;
		if (inputData && inputData.length > 0) {
			inputData.map((item, index) => {
				const object = {};
				const labelVi = `${item.lastName} ${item.firstName}`;
				const labelEn = `${item.firstName} ${item.lastName}`;
				object.label = language === LANGUAGES.VI ? labelVi : labelEn;
				object.value = item.id;
				result.push(object);
			});
		}
		return result;
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctors !== this.props.allDoctors) {
			const dataSelect = this.buildDataInputSelect(this.props.allDoctors);
			this.setState({
				listDoctors: dataSelect,
			});
		}
		if (prevProps.language !== this.props.language) {
			const dataSelect = this.buildDataInputSelect(this.props.allDoctors);
			this.setState({
				listDoctors: dataSelect,
			});
		}
		if (prevProps.infoDoctor !== this.props.infoDoctor) {
			this.setState({
				infoDoctor: this.props.infoDoctor,
			});
		}
	}

	handleChangeSelect = async (selectedOption) => {
		this.setState({
			selectedOption,
		});
		await this.props.getInfoOfDoctor(selectedOption.value);
		const infoDoctor = this.state.infoDoctor;
		if (infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description) {
			const markdown = infoDoctor.Markdown;
			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true
			});
		} else {
			this.setState({
				contentHTML: '',
				contentMarkdown: '',
				description: '',
				hasOldData: false
			});
		}
	};

	// Finish!
	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentHTML: html,
			contentMarkdown: text,
		});
	};

	handleOnChangeDescription = (event) => {
		this.setState({
			description: event.target.value,
		});
	};

	handleSaveContentMarkdown = () => {
		const hasOldData = this.state.hasOldData
		this.props.saveInfoOfDoctor({
			contentHTML: this.state.contentHTML,
			contentMarkdown: this.state.contentMarkdown,
			description: this.state.description,
			doctorId: this.state.selectedOption.value,
			action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
		});
	};

	render() {
		const hasOldData = this.state.hasOldData
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
				<div className="more-info">
					<div className="content-left form-group">
						<label>Chọn bác sĩ:</label>
						<Select
							value={this.state.selectedOption}
							onChange={this.handleChangeSelect}
							options={this.state.listDoctors}
						/>
					</div>
					<div className="content-right">
						<label>Thông tin giới thiệu:</label>
						<textarea
							className="form-control"
							rows="4"
							onChange={(event) => this.handleOnChangeDescription(event)}
							value={this.state.description}
						></textarea>
					</div>
				</div>
				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: '500px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.contentMarkdown}
					/>
				</div>
				<button
					className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
					onClick={() => this.handleSaveContentMarkdown()}
				>
					{hasOldData === true ?
						<span>Lưu</span> :
						<span>Tạo</span>
					}
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		allDoctors: state.admin.allDoctors,
		infoDoctor: state.admin.infoDoctor,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		saveInfoOfDoctor: (data) => dispatch(actions.saveInfoOfDoctor(data)),
		getInfoOfDoctor: (doctorId) => dispatch(actions.getInfoOfDoctor(doctorId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
