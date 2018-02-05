import React, {Component} from 'react';

export default class WarriorProfile extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        console.log("WarriorProfileComponent Mounted: ", this.props.programmer);
    }


    render(){
            let skillNames = [];
            skillNames = Object.getOwnPropertyNames(this.props.programmer.codeSkills);
            let skills = skillNames.map( skill => {
                if(this.props.programmer.codeSkills[skill] !== 0){
                    return (
                        <div id={`skill-${skill}`} className="skill">
                            <span>{`${skill}: ${this.props.programmer.codeSkills[skill]}`}</span>
                        </div>
                    )
                }       
            })


        return (
            <div id={`programmer${this.props.id}`} className={'warriorProfile-tile'}>
                <img src={this.props.programmer.imgURL} className="tile-image"></img>
                <span className="tile-name">{`Warrior Name: ${this.props.programmer.name}`}</span>
                <span className="tile-age">{this.props.programmer.age}</span>
                <div className="tile-skills">
                    {skills}
                </div>
            </div>
        );
    }
}