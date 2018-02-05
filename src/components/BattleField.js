import React, { Component } from 'react';
import WarriorProfile from './WarriorProfile';

export default class BattleField extends Component {
    constructor() {
        super();
        this.state={
            allProgrammers: [],
            filteredWithStats: [],
        }
        this.filterOutSissies = this.filterOutSissies.bind(this);
        this.getWarriorProfiles = this.getWarriorProfiles.bind(this);
        this.getWarriorStats = this.getWarriorStats.bind(this);
    }

    componentWillMount() {
        console.log("Battlefield rendered: ", this.props.programmers);
        this.setState({
            allProgrammers: []
        })
        this.setState({
            allProgrammers: this.props.programmers,
        })
    }

    filterOutSissies() {
        let warriors = this.state.allProgrammers.filter( programmer => {
            return (programmer.battleReady);
        })
        return warriors;
    }



    getWarriorProfiles(warriors) {
        // Get wheighted totals back in an arrray whose indices corrrespond to the warriors array
        let outcomes = this.getWarriorStats(warriors);
        // Get the index of the winner
        let winner = outcomes.indexOf(Math.max(...outcomes));
        let profiles = warriors.map( (programmer, i) => {
            return (
                <div className={i === winner ? 'winner-container' : 'looser-container'}>
                    <WarriorProfile programmer={programmer} id={programmer.id} />
                    {/* <input type="checkbox" id={programmer.id} ref="check_me" checked={this.state.allProgrammers[i].battleReady} onClick={ e => this.prepareForBattle(e)}></input> */}
                </div>
            );
        })


        return profiles;
    }

    getWarriorStats(warriors){
        let outcomes = [];
        for(let i = 0; i < warriors.length; i++) {
            let skills = Object.getOwnPropertyNames(warriors[i].codeSkills);
            outcomes.push(0);
            for(let i2 = 0; i2 < skills.length; i2++) {
                switch(skills[i2]) {
                    case "react":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1.5;
                    case "javascript":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 2;
                    case "html":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1.3;
                    case "css":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1.2;
                    case "node":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1;
                    case "sql":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1.5;
                    case "committment":
                        outcomes[i] += warriors[i].codeSkills[skills[i2]] * .2;
                    case "commandPrompt":
                      outcomes[i] +=   warriors[i].codeSkills[skills[i2]]* 1.5;
                    default:
                        // outcomes[i] += warriors[i].codeSkills[skills[i2]] * 1;
                        break;
                }   
            }
        }
        
        return outcomes;
    }

    render() {
        let warriors = this.filterOutSissies();
        let warriorProfiles = this.getWarriorProfiles(warriors);

        return (
            <div>
                <h1 className="page-header">Are you not entertained!!?</h1>
                <div className="programmer-tiles-container">
                    {warriorProfiles}
                </div>
            </div>
        );
    }
}
