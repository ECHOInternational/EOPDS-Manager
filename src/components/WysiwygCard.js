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
		showCharacterCount: false
	}

	static propTypes = {
		allowEdit: PropTypes.bool,
		value: PropTypes.string,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		showWordCount: PropTypes.bool,
		showCharacterCount: PropTypes.bool,
	}

	_handleChange = (evt, editor) => {
		const data = editor.getData();
		console.log(data);
		this.props.onChange(data);
	}

	render() {
		const config = {
			placeholder: this.props.placeholder
		} 
		return(
			<Card>
				<CardHeader>
					{this.props.name}
					<div className="card-header-actions">
						<EditableStatusIndicator editable={this.props.allowEdit} />
		            </div>
					
				</CardHeader>
				<CKEditor
			        editor={ ClassicEditor }
			        data={this.props.value}
			        disabled={!this.props.allowEdit}
			        config={config}
					// onInit={ editor => {
					// 	console.log( 'Editor is ready to use!', editor );
					// 	} );
					// } }
			        onChange={this._handleChange}
			        // onBlur={ ( event, editor ) => {
			        //     console.log( 'Blur.', editor );
			        // } }
			        // onFocus={ ( event, editor ) => {
			        //     console.log( 'Focus.', editor );
			        // } }
			    />
			    <TextCounter text={this.props.value} showWordCount={this.props.showWordCount} showCharacterCount={this.props.showCharacterCount} />
			</Card>
		)
	}

}

export default WysiwygCard;