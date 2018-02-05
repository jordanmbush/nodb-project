import React, { Component } from 'react';
import logo from './logo.svg';
import codeLogo from './logo.png';
import './App.css';
import axios from 'axios';
import AddProgrammer from './components/AddProgrammer';
import BattleProgrammers from './components/BattleProgrammers';
import BattleField from './components/BattleField'
import HelpPage from './components/HelpPage';

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedComponent: '',
      programmers: [],
      programmerCount: 0,
      editProgrammer: {
        name: '',
        age: '',
        battleReady: false,
        codeSkills: {
            react: 0,
            javascript: 0,
            html: 0,
            css: 0,
            node: 0,
            sql: 0,
            committment: 0,
            commandPrompt: 0
        },
        imgURL: '',
        id: 0,
      }
    }

    // BINDING
    this.updateProgrammerCount = this.updateProgrammerCount.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.updateProgrammers = this.updateProgrammers.bind(this);
    this.getPage = this.getPage.bind(this);
    this.setEditProgrammer = this.setEditProgrammer.bind(this);
    this.getBattlReadyCount = this.getBattlReadyCount.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/programmers").then( response => {
      this.setState({
        programmers: response.data,
        programmerCount: response.data.length
      })
    })
  }

  eventHandler(e) {
    // let programmersCopy = this.state.programmers.map( programmer => {
    //   programmer.battleReady = false;
    //   return programmer;
    // })
    this.setState({
      // programmers: programmersCopy,
      selectedComponent: e.target.id, 
      editProgrammer: {
        name: '',
        age: '',
        battleReady: false,
        codeSkills: {
            react: 0,
            javascript: 0,
            html: 0,
            css: 0,
            node: 0,
            sql: 0,
            committment: 0,
            commandPrompt: 0
        },
        imgURL: '',
      } 
  })
  }

  updateProgrammerCount(cnt){
    this.setState({
      programmerCount: cnt
    })
  }

  updateProgrammers(updatedProgrammers){
    this.setState({
      programmers: updatedProgrammers
    })
  }

  setEditProgrammer(programmer) {
    this.setState({
      editProgrammer: programmer,
      selectedComponent: 'addProgrammerButton',
    })
  }

  getBattlReadyCount() {
    let cnt = 0;
    for(let i = 0; i < this.state.programmers.length; i++) {
      if(this.state.programmers[i].battleReady) {
        cnt++;
      }
    }

    return cnt;
  }

  getPage(){
      let renderChoice = null;
    switch(this.state.selectedComponent) {
      case 'addProgrammerButton':
        renderChoice =  <AddProgrammer updateProgrammerCount={this.updateProgrammerCount} programmerCount={this.state.programmerCount} selectedProgrammer={this.state.editProgrammer}/>
        break;
      case 'seeAllProgrammersButton':
        renderChoice = <BattleProgrammers selectProgrammer={this.setEditProgrammer} programmers={this.state.programmers} updateProgrammerCount={this.updateProgrammerCount} programmerCount={this.state.programmerCount} updateProgrammers={this.updateProgrammers}/>
        break
      case 'battleProgrammersButton':
        let cnt = this.getBattlReadyCount();
        if(cnt < 2) {
          alert("Whoa there Mr. Durden. This isn't Fight Club. This is Code Club. You can't fight yourself here. Bring a friend next time, and read the rules.")
        } else {
          renderChoice = <BattleField programmers={this.state.programmers} />
        }
        break
      case 'helpPageButton':
        renderChoice = <HelpPage />
      default:
        break;
    }

    return renderChoice;
  }

  
  render() {

    let renderChoice = this.getPage();

    return (
      <div className="App">
        <header className="App-header">
          <img src={codeLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Code Club</h1>
        </header>
        <div className="body-content">
          <button className="submit-button help-button" id="helpPageButton" onClick={e => this.eventHandler(e)}>Help/Rules</button>
          <br></br>
          <button className="submit-button" id="addProgrammerButton" onClick={ e => this.eventHandler(e)} >Add Programmer</button>
          <button className="submit-button" id="seeAllProgrammersButton" onClick={ e => this.eventHandler(e)} >Choose Your Combatants</button>
          <button className="submit-button" id="battleProgrammersButton" onClick={ e => this.eventHandler(e)} >Battle Programmers</button>
          {renderChoice}
        </div>
      </div>
    );
  }
}

export default App;
