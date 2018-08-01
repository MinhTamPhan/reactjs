import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Comment extends Component {

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log('current state is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
      <div >
        <Button outline onClick={this.toggleModal} >
          <span className='fa fa-pencil fa-lg'> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <div className='container'>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className='form-group'>                    
                    <Label htmlFor='rating'>Rating</Label>
                    <Control.select model='.rating' name='rating' className='form-control'>
                      <option selected='true'> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </Control.select>                  
                  </Row>
                  <Row className='form-group'>
                    <Label htmlFor='yourName'>Your Name</Label>
                    <Control.text model='.yourName' id='yourName' name='yourName' className='form-control' autoComplete='off' validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                    <Errors className='text-danger' model='.yourName' show="touched" 
                    messages={{required: 'Required', minLength:'Must be greater than 10 characters', maxLength:'Must be 15  characters or less',  isNumber: 'Must be a number'}}/>
                  </Row>
                  <Row className='form-group'>
                    <Label htmlFor='comment'>Comment</Label>
                    <Control.textarea model='.comment' id='comment' name='comment' className='form-control' rows='6' autoComplete='off' validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                    <Errors className='text-danger' model='.comment' show="touched" 
                    messages={{required: 'Required', minLength:'Must be greater than 10 characters', maxLength:'Must be 15  characters or less',  isNumber: 'Must be a number'}}/>
                  </Row>
                  <Button type='submit' value='submit' className='bg-primary'>Login</Button>
                </LocalForm>
              </div>
            </ModalBody>
          </Modal>
      </div>
    );
  }
}

export default Comment;
