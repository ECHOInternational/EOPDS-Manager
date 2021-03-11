import React from 'react';
import { Input } from 'reactstrap';

const TranslationSelector = (props) => {
  
  const buildOption = (translation) => {
    const languageNames = new Intl.DisplayNames([props.currentLanguage], {type: 'language'})
    return(
      <option key={translation.locale} value={translation.locale}>
        {languageNames.of(translation.locale)}
      </option>
    )
  }

	const options = props.translations
    .filter((translation) => translation.locale !== props.currentLanguage)
    .map(buildOption)

	return(
    <Input type="select" name={props.name} onChange={props.onChange}>
      {options}
    </Input>
  )
}

export default TranslationSelector;