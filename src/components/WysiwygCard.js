import React, { Component } from 'react';
import { Card, CardHeader, CardFooter} from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import EditableStatusIndicator from './EditableStatusIndicator';


const TextCounter = ({text = '', showWordCount = true, showCharacterCount = false}) => {
	
	const words = text.match(/(?<!<\/?[^>]*|&[^;]*)\b[-?(\w+)?]+\b/gi);
	const wordcount = (words ? words.length : 0 );
	const charactercount = text.length
		
	if(showWordCount && showCharacterCount) {
		return(
			<CardFooter>
				{wordcount} Words | {charactercount} Characters
			</CardFooter>
		);
	}else if(showWordCount){
		return(
			<CardFooter>
				{wordcount} Words
			</CardFooter>
		);
	}else if(showCharacterCount){
		return(
			<CardFooter>
				{charactercount} Characters
			</CardFooter>
		);
	}else{
		return(<span></span>);
	}

};

class WysiwygCard extends Component {
	
	static defaultProps = {
		allowEdit: true,
		showWordCount: false,
		showCharacterCount: false,
		hasChanges: false,
	}

	static propTypes = {
		allowEdit: PropTypes.bool,
		value: PropTypes.string,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		showWordCount: PropTypes.bool,
		showCharacterCount: PropTypes.bool,
		hasChanges: PropTypes.bool,
		label: PropTypes.string.isRequired,
		error: PropTypes.object,
	}

	_handleChange = (evt, editor) => {
		const data = editor.getData();
		this.props.onChange(data);
	}

	_statusClass = () => {
		if(this.props.error){ return "card-accent-danger" };
		if(this.props.hasChanges){ return "card-accent-success" };
		return "";
	}

	render() {
		const config = {
			placeholder: this.props.placeholder
		} 
		return(
			<Card className={this._statusClass()}>
				<CardHeader>
					{this.props.label} {this.props.error && this.props.error.message}
					<div className="card-header-actions">
						<EditableStatusIndicator editable={this.props.allowEdit} error={this.props.error} />
		            </div>
				</CardHeader>
				<CKEditor
			        editor={ ClassicEditor }
			        data={this.props.value}
			        disabled={!this.props.allowEdit}
			        config={config}
			        onChange={this._handleChange}
			    />
			    <TextCounter text={this.props.value || ''} showWordCount={this.props.showWordCount} showCharacterCount={this.props.showCharacterCount} />
			</Card>
		)
	}

}

export default WysiwygCard;