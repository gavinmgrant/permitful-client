import React, { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetNumber: "",
            streetName: "",
            streetSuffix: "st",
            unitNumber: "",
            properties: [],
        }
        this.updateStreetNumber = this.updateStreetNumber.bind(this);
        this.updateStreetName = this.updateStreetName.bind(this);
        this.updateStreetSuffix = this.updateStreetSuffix.bind(this);
    }
    
    updateStreetNumber(event) {
        this.setState({ streetNumber: event.target.value });
        console.log(this.streetNumber);
    }

    updateStreetName(event) {
        this.setState({ streetName: event.target.value });
        console.log(this.streetName);
    }

    updateStreetSuffix(event) {
        this.setState({ streetSuffix: event.target.value });
        console.log(this.streetSuffix);
    }

    render() {
        return (
            <section className="search-container">
                <h2>Enter the property address</h2>
                <form>
                    <section className="search-form">
                        <div>
                            <label htmlFor="street-number">Street number</label>
                            <input 
                                placeholder='123' 
                                type="text" 
                                name='street-number' 
                                id='street-number'
                                value={this.state.streetNumber}
                                onChange={this.updateStreetNumber} 
                            />
                        </div>
                        <div>
                            <label htmlFor="street-name">Street name</label>
                            <input 
                                placeholder='Main' 
                                type="text" 
                                name='street-name' 
                                id='street-name'
                                value={this.state.streetName}
                                onChange={this.updateStreetName}
                            />
                        </div>
                        <div>
                            <label htmlFor="street-suffix">Street suffix</label>
                                <select 
                                    name="street-suffix" 
                                    id="street-suffix" 
                                    className="search-select" 
                                    value={this.state.streetSuffix}
                                    onChange={this.updateStreetSuffix}
                                >
                                    <option value="av">Av</option>
                                    <option value="bl">Bl</option>
                                    <option value="ct">Ct</option>
                                    <option value="dr">Dr</option>
                                    <option value="hy">Hy</option>
                                    <option value="st">St</option>
                                    <option value="tl">Tl</option>
                                    <option value="wy">Wy</option>
                                </select>
                        </div>
                        <div>
                            <label htmlFor="unit-number">Unit number</label>
                            <input placeholder='1, if applicable' type="text" name='unit-number' id='unit-number' />
                        </div>
                    </section>
                    <button type='submit' className='search-button'>Submit</button>
                </form>
            </section>
        )
    }
}