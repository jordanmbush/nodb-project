import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import WarriorProfile from './WarriorProfile';

export default class BattleProgrammers extends Component {
    constructor() {
        super();
        this.state = {
            programmers: [

            ]
        }
        this.prepareForBattle = this.prepareForBattle.bind(this);
        this.getWarriorProfiles = this.getWarriorProfiles.bind(this);
        this.deleteProgrammer = this.deleteProgrammer.bind(this);
        this.updateProgrammer = this.updateProgrammer.bind(this);
        this.getWarriorIndexByID = this.getWarriorIndexByID.bind(this);
    }

    componentDidMount() {
        // axios.get('http://localhost:4000/api/programmers').then( response => {
        //     this.setState({
        //         programmers: response.data,
        //     })
        // })
        this.setState({
            programmers: this.props.programmers
        })
    }

    prepareForBattle(e) {
        let id = e.target.id;
        let programmersCopy = this.state.programmers.slice();
        
        let warriorIndex = this.getWarriorIndexByID(id);
        programmersCopy[warriorIndex].battleReady = !programmersCopy[warriorIndex].battleReady;

        this.setState({
            programmers: programmersCopy
        })

        this.props.updateProgrammers(programmersCopy);
    }
    deleteProgrammer(e) {
        let id = e.target.id;


        axios.delete(`http://localhost:4000/api/programmer?id=${id}`).then( response => {
            let programmersCopy = response.data; 
            this.setState({
                programmers: programmersCopy
            })   
            this.props.updateProgrammers(programmersCopy);
            this.props.updateProgrammerCount(response.data.length);  
        })
        
        // programmersCopy[id].battleReady = !programmersCopy[id].battleReady;

    }

    updateProgrammer(e) {
        let id = e.target.id;
        let selectedProgrammer = this.state.programmers.filter( programmer => {
            return programmer.id === parseInt(id);
        })
        this.props.selectProgrammer(selectedProgrammer[0]);
    }

    getWarriorIndexByID(id) {
        let warriorIndex = null;
        for(let i = 0; i < this.state.programmers.length; i++) {
            if(this.state.programmers[i].id === +id) {
                warriorIndex = i;
            }
        }
        return warriorIndex;
    }

    getWarriorProfiles() {
        let profiles = this.state.programmers.map( (programmer) => {
            return (
                <div className="warriorTileContainer">
                    <WarriorProfile programmer={programmer} id={programmer.id} />
                    <div className="tile-input-itmes">
                        <input className="tile-button kill-button" type="button" id={programmer.id} value="Disqualify" onClick={ e => this.deleteProgrammer(e)}></input>
                        <input className="tile-button update-button" type="button" id={programmer.id} value="Alter the Arsenal" onClick={ e => this.updateProgrammer(e)}></input>
                        <input className="battle-checkbox" type="checkbox" id={programmer.id} checked={this.state.programmers[this.getWarriorIndexByID(programmer.id)].battleReady} onClick={ e => this.prepareForBattle(e)}></input>
                    </div>
                </div>
            );
        })

        return profiles;
    }

    render() {
        let programmerTiles = this.getWarriorProfiles();
        return (
            <div>
                <h1 className="page-header">Let the Battles Begin!</h1>
                <div className="programmer-tiles-container">
                    {programmerTiles}
                </div>
            </div>
        );
    }
}
