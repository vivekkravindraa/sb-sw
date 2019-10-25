import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class LanguageSelect extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        fetch(`https://restcountries.eu/rest/v2/all`)
        .then((response) => response.json())
        .then((data) => this.setState({ data }))
    }

    render() {
        let baseClassName = "pb-language-select";

        let {
            parentClassName
        } = this.props;

        let classes = {
            [baseClassName]: true,
            [parentClassName]: parentClassName
        }

        return (
            <div className={classNames(classes)}>

            </div>
        )
    }
}

LanguageSelect.propTypes = {
    label: PropTypes.bool
}
