import React from "react";
import { Prompt } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import cuid from "cuid";



class PreventTransitionPrompt extends React.Component {
  /**
   * Dialog state
   */
  state = { 
  	open: false,
  	callbackFunction: () => {}
  };

  constructor() {
    super();

    // Define a unique global symbol to store
    // a dialog trigger reference accessible via
    // a string key. Use cuid for unique ID.
    this.__trigger = Symbol.for(`__PreventTransitionPrompt_${cuid()}`);
  }

  /**
   * Attach global dialog trigger for this component
   * instance to our Symbol trigger
   */
  componentDidMount() {
    window[this.__trigger] = this.show;
  }

  /**
   * Ensure we clean up and remove the reference
   * from the global object
   */
  componentWillUnmount() {
    delete window[this.__trigger];
  }

  render() {
    const { when, title, message } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        {/* React Router prompt, callback will return true to allow transition or dialog key to prevent */}
        <Prompt when={when} message={this.handleTransition} />

        {/* Example MUI dialog to show when open. You could make this
            totally customizable or a complete one-off. */}
        <Modal isOpen={open} className={'modal-primary'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" outline onClick={this.handleDiscard} className="mr-auto">
              Don't Save
            </Button>

            <Button color="secondary" onClick={this.handleReview}>Cancel</Button>
            <Button color="success" onClick={this.handleSave} autoFocus>
              Save
            </Button>

            

            

          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }

  /**
   * Show the dialog. Invoked primarily from React Router transition
   * handler getUserConfirmation.
   *
   * @param allowTransitionCallback A function that accepts a flag whether or not to allow the route transition
   */
  show = allowTransitionCallback => {
    this.setState({
    	open: true,
    	callbackFunction: allowTransitionCallback
    });
  };

  /**
   * Closes the dialog
   */
  handleReview = () => {
    this.setState({ open: false });
  };

  handleDiscard = () => {
  	this.state.callbackFunction(true);
  };

  handleSave = () => {
  	this.props.onSave();
  	this.setState({open: false});
  }

  /**
   * Handles the Router transition. Returns true if allowed
   * or the dialog trigger key to enable the dialog.
   *
   * This would be a good candidate to allow optionally
   * being passed as a callback prop to let
   * caller decide if transition is allowed.
   */
  handleTransition = location => {
    // example: allow transitions to /two
    // if (location.pathname === "/two") {
    //   return true;
    // }

    return Symbol.keyFor(this.__trigger);
  };
}

export default PreventTransitionPrompt;