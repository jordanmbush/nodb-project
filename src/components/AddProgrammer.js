import React, { Component } from 'react';
import Slider from './Slider';
import axios from 'axios';
import './../App.css';

export default class AddProgrammer extends Component {
    constructor() {
        super();
        this.state = {
            programmer: {},
            programmerCount: 0,
            updating: false,
            totalPointsUsed: 0,
        }
        // BINDING //
        this.updateSliderValue = this.updateSliderValue.bind(this);
        this.getSliderComponents = this.getSliderComponents.bind(this);
        this.addProgrammer = this.addProgrammer.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getFunnyPic = this.getFunnyPic.bind(this);
        this.getRobotPic = this.getRobotPic.bind(this);
    }

// --------------------------------------------------------------
    componentDidMount() {
        let updating = false;
        if(this.props.selectedProgrammer.name) {
            updating = true;
        }
        console.log("Add did mount: update: ", updating);
        this.setState({
            programmerCount: this.props.programmerCount,
            programmer: this.props.selectedProgrammer,
            updating: updating,
        })
    }

    componentWillMount() {
        console.log("WillMount-selectedProgrammer: ", this.props.selectedProgrammer);
        this.setState({
            programmerCount: this.props.programmerCount,
            programmer: this.props.selectedProgrammer,
        })
    }
// --------------------------------------------------------------
    updateSliderValue(e) {
        let sliderValue = e.target.value;
        let programmer = Object.assign({}, this.state.programmer);
        let skills = Object.getOwnPropertyNames(programmer.codeSkills);
        let slidersTotal = 0;
        for(let i = 0; i < skills.length; i++) {
            if(skills[i] !== e.target.id) {
                slidersTotal += parseInt(programmer.codeSkills[skills[i]]);
            }
        }
        let newTotal = parseInt(slidersTotal) + parseInt(sliderValue);

        let newSliderValue =  newTotal <= 1000 ? sliderValue : 1000 - slidersTotal;
        programmer.codeSkills[e.target.id] = newSliderValue !== 0 ? newSliderValue : programmer.codeSkills[e.target.id];
        let totalPointsUsed = parseInt(slidersTotal) + parseInt(newSliderValue);
        this.setState({
            programmer,
            totalPointsUsed
        });

    }
// --------------------------------------------------------------
    getSliderComponents(){
        let skillsArr = [];
        for(let skill in this.state.programmer.codeSkills){
            skillsArr.push(skill);
        }
        let returnArr = skillsArr.map( skill => {
            return (
                <div>
                    {skill.toUpperCase()}
                    <Slider id={skill} value={this.state.programmer.codeSkills[skill]} sliderChange={this.updateSliderValue} spanID={skill + 'Output'}/>
                </div>
            )
        })
        return returnArr;
    }
// --------------------------------------------------------------
    addProgrammer() {
        switch(''){
            case this.state.programmer.name:
                alert("HEY! We don't allow any no-names here. Figure it out pal.");
                return
            case this.state.programmer.age:
                alert("I'm sorry if I yelled at you about the name, but seriously? Add the age.");
                return
            case this.state.programmer.imgURL:
                alert("Scared to show your face!? Please get an image before continuing. We appreciate your cooperation.");
                return
            default:
                break;
        }

        const empty = {
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

        console.log("adding or updating", this.state.updating)
        // UPDATE
        if(this.state.updating){
            axios.put(`http://localhost:4000/api/programmer/${this.state.programmer.id}`, this.state.programmer).then( response => {
                this.props.updateProgrammerCount(this.props.programmerCount); 
                this.props.updateProgrammers(response.data);
            })
        // CREATE
        } else {
            axios.post('http://localhost:4000/api/programmers', this.state.programmer).then( response => {
                // this.props.updateProgrammerCount(this.props.programmerCount + 1);  
                this.props.updateProgrammerCount(response.data.length);  
                this.props.updateProgrammers(response.data);
            })
        }

        this.setState({
            programmer: empty,
            programmerCount: this.props.programmerCount
        })   
    }
// --------------------------------------------------------------
    updateName(val){
        let programmer = Object.assign({}, this.state.programmer);
        programmer.name = val;
        this.setState({
            programmer,
        })

    }    
// --------------------------------------------------------------
    updateAge(val) {
        let programmer = Object.assign({}, this.state.programmer);
        programmer.age = val;
        this.setState({
            programmer,
        })
    }
// --------------------------------------------------------------
    getImage() {
        let programmer = Object.assign({}, this.state.programmer);
        axios.get('https://randomuser.me/api/').then( response => {
            programmer.imgURL = response.data.results[0].picture.large;

            this.setState({
                programmer,
            })
        })
    }
// --------------------------------------------------------------
    getFunnyPic() {
        let programmer = Object.assign({}, this.state.programmer);
        axios.get('http://localhost:4000/api/funnypics').then( response => {
            programmer.imgURL = response.data;
            this.setState({
                programmer,
            })
        })
    }
// --------------------------------------------------------------
    getRobotPic() {
        let programmer = Object.assign({}, this.state.programmer);
        console.log(`http://robohash.org/${programmer.name}${programmer.age}`);
        axios.get(`http://robohash.org/${programmer.name}${programmer.age}`).then( response => {
            programmer.imgURL = `http://robohash.org/${programmer.name}${programmer.age}`
            // console.log("Dog data: ", response.data.data);
            this.setState({
                programmer,
            })
        })
    }
// --------------------------------------------------------------

    render() {
        let sliderComponents =  this.getSliderComponents();
        return (
            <div>
                <h1 className="page-header" >Create The Ultimate Programmer!</h1>
                <span className="programmerCount">Programmers Ready to Battle: {this.props.programmerCount}</span>
                Name: <input className="AddPerson-TextBox person-name" value={this.state.programmer.name} onChange={ e => this.updateName(e.target.value)} />
                Age: <input type="number" className="AddPerson-TextBox person-age" value={this.state.programmer.age} onChange={ e => this.updateAge(e.target.value)} />
                <br></br>
                <input type="button" className="submit-button" value="Random Person Image" onClick={this.getImage}></input>
                <input type="button" className="submit-button" value="Random 'Funny' looking Person Image" onClick={this.getFunnyPic}></input>
                <input type="button" className="submit-button" value="Your Inner Robot" onClick={this.getRobotPic}></input>
                <img className="image-box" src={this.state.programmer.imgURL}></img>
                <div className="main">
                    <h3 className="AddPerson-Header">Add Some Code Skills!</h3>
                    <small>Note: You only have 1000 points to assign total! </small><span className="skill-points-left">{`Points Remaining: ${1000 - parseInt(this.state.totalPointsUsed)}`}</span>
                    {sliderComponents}
                    <br/>
                    <input className="submit-button" type="button" value="Submit" onClick={this.addProgrammer}></input>
                    <div className="footer-bar"></div>
                </div>
            </div>
        );
    }
}
