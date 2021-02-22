import React from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { languages } from '../languages';
import { useTranslation } from 'react-i18next';
import { userCurrentLanguage } from '../cache';
import './AppLanguageChooser.scss';

const AppLanguageChooser = (props) =>{
	const { t, i18n } = useTranslation('languages');

	const setLanguage = (language) => {
		i18n.changeLanguage(language);
		userCurrentLanguage(language);
	}

	// Default to english if the language cannot be found.
	const currentLanguage = languages.find(l => l.id === i18n.language) || languages.find(l => l.id === "en");



	return (
	<div>
		<UncontrolledDropdown nav direction="down">
			<DropdownToggle nav >
				<span className="d-none d-sm-inline">
					<i className="fas fa-caret-down"></i><span className="d-none d-md-inline"> {t('Language')}:</span> {currentLanguage.locales['en']}
				</span>
				<span className="d-sm-none">
					<i className="fal fa-language" style={{fontSize: '1.25rem'}}></i>
				</span>
			</DropdownToggle>
			<DropdownMenu right>
				{languages.map(language =>(
					<LanguageMenuItem 
						id={language.id}
						key={language.id}
						name={language.locales['en']}
						localName={language.locales[language.id]}
						active={language.id === i18n.language}
						onClick={setLanguage}
					/>
				))}
			</DropdownMenu>
		</UncontrolledDropdown>
</div>)
}


const LanguageMenuItem = (props) => {
	return(
		<DropdownItem
			className =  {props.active ? 'active' : ''}
			onClick={() => props.onClick(props.id)}
		>
			{props.name}{props.localName ? ` - ${props.localName}` : ''}
		</DropdownItem>
	)
}


export default AppLanguageChooser;
