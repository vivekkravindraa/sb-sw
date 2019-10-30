import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../scss/4-CountryFlagSelect.scss';

export default class CountryFlagSelect extends Component {
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showAll: false,
      allCountries: []
    }
  }

  callCountries = () => {
    fetch(`https://restcountries.eu/rest/v2/all`)
    .then((response) => response.json())
    .then((data) => {
      let allCountries = [];
      data.map((obj, i) => {
        return allCountries.push({
          'value': `${obj.name}`,
          'name': `${obj.name}`
        })
      })
      this.setState({
        data,
        showAll: true,
        allCountries: this.state.allCountries.concat(allCountries)
      })
    })
    .catch((e) => { console.log(e) })
  }

  handleOnChange = (e) => {
    if(e.target.value === 'All') {
      this.callCountries();
    } else if(e.target.value === 'India' || e.target.value === 'Global') {
      this.setState({ data: [], showAll: false, allCountries: [] })
    }
  }

  render() {
    let baseClassName = "pb-country-flag";

    let {
      parentClassName,
      disabled
    } = this.props;

    let classes = {
      [baseClassName]: true,
      [parentClassName]: parentClassName,
      [`${baseClassName}--disabled`]: disabled
    }

    let options = [
      { value: "India", name: "India" },
      { value: "Global", name: "Global" },
      { value: "All", name: "See all countries and regions" }
    ]

    return (
      <div className={classNames(classes)}>
        <select name="countries" id="countries" style={{width:'300px'}}>
          <option value='ad' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag ad" data-title="Andorra">Andorra</option>
          <option value='ae' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag ae" data-title="United Arab Emirates">United Arab Emirates</option>
          <option value='af' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag af" data-title="Afghanistan">Afghanistan</option>
          <option value='ag' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag ag" data-title="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value='ai' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag ai" data-title="Anguilla">Anguilla</option>
          <option value='al' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag al" data-title="Albania">Albania</option>
          <option value='am' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag am" data-title="Armenia">Armenia</option>
          <option value='an' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag an" data-title="Netherlands Antilles">Netherlands Antilles</option>
        </select>
        <label className={`${baseClassName}__label`}>Region or country<div/>
          <select className={`${baseClassName}__select`} onChange={this.handleOnChange}>
          {
            this.state.showAll
            ?
              // this.state.data.map((obj, i) => <option
              //     className={`${baseClassName}__all-options`}
              //     key={i}
              //     value={obj.name}
              //   >
              //     {obj.name}
              //   </option>
              // )
              options.concat(this.state.allCountries).map((obj, i) => <option
                  className={`${baseClassName}__all-options`}
                  key={i}
                  value={obj.value}
                >
                  {obj.name}
                </option>
              )
            :
              options.map((obj, i) => <option
                  className={`${baseClassName}__default-options`}
                  key={i}
                  value={obj.value}
                >
                  {obj.name}
                </option>
              )
          }
          </select>
        </label>
      </div>
    )
  }
}

CountryFlagSelect.propTypes = {
  disabled: PropTypes.bool
}