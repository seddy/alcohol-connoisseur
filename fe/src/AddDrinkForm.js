import React, { Component, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

import './AddDrinkForm.css';

const initialState = {
  showForm: false,
  peopleNames: [],
  personName: '',
  mainDrink: '',
  drinkType: '',
  brandBrewery: '',
  abv: '',
  hasMixer: false,
  mixerOne: '',
  mixerTwo: '',
  ratingWordOne: '',
  ratingWordTwo: '',
  score: '',
  hasCollab: false,
  collabOne: '',
  collabTwo: '',
  company: '',
  notes: ''
}

const Auto = () => {
  const [display, setDisplay] = useEffect(false);
  const

}

class AddDrinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  };

  componentDidMount() {
    let drinkersArray = []
    axios("http://localhost:5000/peoplenames")
      .then(data => {
        drinkersArray = data.data.map((drinker) => {
          return drinker
      });
      this.setState({ peopleNames: drinkersArray })
      }).catch(error => {
        console.log(error);
      });
  }

  toggleAddFormClass = () => {
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState });
  };

  handleFormChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    console.log(this.state)
  }

  toggleHasMixer = () => {
    const currentState = this.state.hasMixer;
    this.setState({ hasMixer: !currentState,
                    mixerOne: '',
                    mixerTwo: ''  });
  };

  toggleHasCollab = () => {
    const currentState = this.state.hasCollab;
    this.setState({ hasCollab: !currentState,
                    collabOne: '',
                    collabTwo: '' });
  };

  validate = (event) => {
    let nam = event.target.name;
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
    }
  }

  render() {
    let drinkerNames = this.state.peopleNames;
    let drinkerNameSelect = drinkerNames.map((name) =>
            <option key={name.drinker} value={name.drinker}>{name.drinker}</option>
        );
        {console.log(this.state)}
    return (
      <div>
        <div className="buttonDiv">
          <button className="addButton" onClick={this.toggleAddFormClass} >Add Drink</button>
        </div>
        {/* <div className="outerContainerWithButton"> */}
          <div className="addFormContainer">
            <Container className={this.state.showForm ?
              'shownAddDrinkForm': 'hiddenAddDrinkForm'}>
              <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
                <Row div className="addDrinkTitle">
                  <div>
                    <p>Drink Details:</p>
                  </div>
                </Row>
                <Row xs="3">
                  <Col>
                    <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Person Name</Label>
                      <Input
                        type="select"
                        name="personName"
                        id="personNameInput"
                        value={this.personName}
                        onChange={this.handleFormChange}
                        className="questionInputTopRow"
                      >
                      <option className="placeholder" value="">Select Drinker:</option>
                      {drinkerNameSelect}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Drink Type</Label>
                      <Input
                        type="select"
                        name="drinkType"
                        id="drinkTypeInput"
                        placeholder="Select Drink Type"
                        value={this.drinkType}
                        onChange={this.handleFormChange}
                        className="questionInputTopRow"
                        >
                        <option className="placeholder" value="">Select Drink Type:</option>
                        <option value="beer">Beer</option>
                        <option value="cider">Cider</option>
                        <option value="wine">Wine</option>
                        <option value="fortifiedWine">Fortified Wine</option>
                        <option value="gin">Gin</option>
                        <option value="vodka">Vodka</option>
                        <option value="whiskey">Whisky</option>
                        <option value="rum">Rum</option>
                        <option value="brandy">Brandy</option>
                        <option value="liqueur">Liqueur</option>
                        <option value="softDrink">Soft Drink</option>
                        <option value="other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Brand or Brewery</Label>
                      <Input
                        type="text"
                        name="brandBrewery"
                        id="brandNameInput"
                        placeholder="Brand or Brewery Name"
                        value={this.state.brandBrewery}
                        onChange={this.handleFormChange}
                        className="questionInputTopRow"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.personName && this.state.drinkType && this.state.brandBrewery &&
                  <>
                    <Row xs="3">
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Main Drink Component</Label>
                          <Input
                            type="text"
                            name="mainDrink"
                            id="mainDrinkComponentInput"
                            placeholder="Main Drink Component"
                            value={this.state.mainDrink}
                            onChange={this.handleFormChange}
                            className="questionInputSecondRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="2">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">ABV(%)</Label>
                          <Input
                            type="number"
                            name="abv"
                            id="abvInput"
                            placeholder="Drink ABV(%)"
                            value={this.state.abv}
                            onChange={this.handleFormChange}
                            className="questionInputSecondRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="4.5" className="questionInputCheckboxes">
                        <FormGroup className="mixerCheck">
                          <Label check>
                          <Input type="checkbox"
                                name="hasMixer"
                                onChange={this.toggleHasMixer}
                                />
                          Mixer(s)?
                          </Label>
                        </FormGroup>
                        <FormGroup check className="collabCheck">
                            <Label check>
                            <Input type="checkbox"
                                  onChange={this.toggleHasCollab}
                                  className="questionInput"/>
                            Collabaratory Brewery(s)?
                            </Label>
                          </FormGroup>
                      </Col>
                    </Row>
                    <Row xs="4">
                      {this.state.hasMixer &&
                      <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                            <Label className="questionLabel">Mixer One</Label>
                            <Input
                              type="text"
                              name="mixerOne"
                              id="mixerOneInput"
                              placeholder="Mixer One"
                              value={this.state.mixerOne}
                              onChange={this.handleFormChange}
                              className="questionInput"/>
                              </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Label className="questionLabel">Mixer Two</Label>
                              <Input
                                type="text"
                                name="mixerTwo"
                                id="mixerTwoInput"
                                placeholder="Mixer Two (optional)"
                                value={this.state.mixerTwo}
                                onChange={this.handleFormChange}
                                className="questionInput"/>
                            </div>
                          </FormGroup>
                        </Col>
                      </>
                      }
                    </Row>
                    <Row xs="4">
                        {this.state.hasCollab &&
                        <>
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">Collabaratory Brewery One</Label>
                              <Input
                                type="text"
                                name="collabOne"
                                id="collabOneInput"
                                placeholder="First Collab"
                                value={this.state.collabOne}
                                onChange={this.handleFormChange}
                                className="questionInput"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">Collabaratory Brewery Two</Label>
                              <Input
                                type="text"
                                name="collabTwo"
                                id="collabTwoInput"
                                placeholder="Second Collab (optional)"
                                value={this.state.collabTwo}
                                onChange={this.handleFormChange}
                                className="questionInput"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        </>
                        }
                    </Row>
                    <Row xs="3">
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Rating Word One</Label>
                          <Input
                            type="text"
                            name="ratingWordOne"
                            id="ratingWordOneInput"
                            placeholder="Rating Word One"
                            value={this.state.ratingWordOne}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Rating Word Two</Label>
                          <Input
                            type="text"
                            name="ratingWordTwo"
                            id="ratingWordTwoInput"
                            placeholder="Rating Word Two"
                            value={this.state.ratingWordTwo}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Score</Label>
                          <Input
                            type="number"
                            name="score"
                            id="scoreInput"
                            placeholder="Score"
                            value={this.state.score}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Company</Label>
                          <Input
                            type="text"
                            name="company"
                            id="companyInput"
                            placeholder="Main Component Company"
                            value={this.state.company}
                            onChange={this.handleFormChange}
                            className="questionInputBottomRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Notes</Label>
                          <Input
                            type="textarea"
                            name="notes"
                            id="notesInput"
                            placeholder="Drink notes here"
                            value={this.state.notes}
                            onChange={this.handleFormChange}
                            className="questionInputBottomRow"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="submitButton">Submit Drink</Button>
                    </div>
                  </>
                }
              </Form>
            </Container>
          </div>
        {/* </div> */}
      </div>
    )
  }
}

export default AddDrinkForm;