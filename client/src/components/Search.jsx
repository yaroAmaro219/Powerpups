import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";

import '../styles/SearchBar.css';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const indicatorSeparatorStyle = {
    display: 'none',
  };

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      selectedOption: null,
      searchOutput: [],
      searchClicked: false,
      isOpen: false,
    };
  }
  handleProfileOpen = () => {
    this.setState({ isOpen: true })
  };

  handleProfileClose = () => {
    this.setState({ isOpen: false })
  };


  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  Option = (props) => {
    return (
      <components.Option {...props}>
        {/* <Link */}
        <div
          className="user-profile-link"
          onClick={() => this.setState({ isOpen: true})}
          to={{
            pathname: "/",
            state: { userId: props.data.value },
          }}
        >
          <span className="user-avatar"></span>
          <span className="link-stock-symbol">{props.data.subLabel} {this.truncateString(props.data.label, 40)}</span>
          <span className="user-location">{props.data.location}</span>
        {/* </Link> */}
        </div>
      </components.Option>
    );
  }
  IndicatorsContainer = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };
  ValueContainer = (props) => (
    <components.ValueContainer {...props}></components.ValueContainer>
  );

  render() {
    const searchResults = this.props.listOfUsers;
    console.log(searchResults);
    const searchOptions = searchResults.map(({ first_name, last_name, location }) => {
      return {
        value: first_name,
        label: last_name,
        subLabel: first_name,
        location: location,
      };
    });
    const selectedOption = this.props.selectedOption;
    const Option = this.Option;
    const IndicatorsContainer = this.IndicatorsContainer;
    const ValueContainer = this.ValueContainer;
    // const DropdownIndicator = this.DropdownIndicator
    return (
      <div className="search-page-container">
        {/* <div className={classes.container}> */}
        <div className="search-container">
          <form
            className="form-container"
            onChange={this.props.onSearchChange}
          >
            <Select
              className="react-select-container"
              value={selectedOption}
              options={searchOptions}
              onChange={this.handleProfileClose}
              placeholder="Search Datadog Employees"
              autoFocus={true}
              isSearchable={true}
              isClearable={true}
              openMenuOnClick={false}
              closeMenuOnSelect={true}
              classNamePrefix="react-select"
              backspaceRemovesValue={true}
            //   menuIsOpen={true}
              styles={{
                valueContainer: (base) => ({
                  ...base,
                  backgroundColor: "#dee8f3",
                }),
              }}
              components={{ Option, IndicatorsContainer, ValueContainer }}
            />
          </form>
        </div>
        <Drawer
        className="employee-profile-container"
        variant="temporary"
        anchor="right"
        open={this.state.isOpen}
      >
        <div className="profile-header">
          <IconButton onClick={this.handleProfileClose}>
            {!this.state.isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
      </Drawer>
      </div>
    );
  }
}

export default Search;