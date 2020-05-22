import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";

import '../styles/SearchBar.css';
import SearchIcon from '@material-ui/icons/Search'


const indicatorSeparatorStyle = {
    display: 'none',
  };

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      selectedOption: null,
      // isSelected
      searchOutput: [],
      searchClicked: false,
    };
  }


  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  Option = (props) => {
    return (
      <components.Option {...props}>
        <Link
          className="user-profile-link"
          to={{
            pathname: "employee-profile",
            state: { userId: props.data.value },
          }}
        >
          <span className="user-avatar"></span>
          <span className="user-name">{props.data.subLabel} {this.truncateString(props.data.label, 40)}</span>
          {/* <span className="link-stock-name"></span> */}
          <span className="user-location">{props.data.location}</span>
        </Link>
      </components.Option>
    );
  }
//   SearchInputIcon = () => {
//     return <SearchIcon />;
//   };

//   DropdownIndicator = (props) => {
//     return (
//       <components.DropdownIndicator {...props}>
//         <SearchIcon />
//       </components.DropdownIndicator>
//     );
//   };
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
    // const DropdownIndicator = this.DropdownIndicator;
    const ValueContainer = this.ValueContainer;
    // const DropdownIndicator = this.DropdownIndicator
    return (
      <div className="search-page-container">
        <div className="search-container">
          <form
            className="form-container"
            onChange={this.props.onSearchChange}
          >
            <Select
              className="react-select-container"
              value={selectedOption}
              options={searchOptions}
              onChange={this.props.handleSelect}
              placeholder={"🔍 Search Datadog Employees"}
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
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                }),
              }}
              components={{ Option, IndicatorsContainer, ValueContainer }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;