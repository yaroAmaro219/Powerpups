// import React from 'react'

// const Search = ({ onChange, onSubmit, name, value }) => {
//   return (
//     <form
//       onSubmit={
//         e => onSubmit(e)
//       }>
//       <input
//         class="search"
//         value={value}
//         onChange={e => onChange(e)}
//         name={name}
//         type="text"
//         placeholder='Search Datadog employees'
//       />
//       <button type="submit">Search</button>
//     </form>
//   )
// }

// export default Search

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";

import '../styles/SearchBar.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

c

const indicatorSeparatorStyle = {
    display: 'none',
  };

function Search(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState({});

  const toggleProfile = (e) => {
    e.prevenDefault();
    setIsOpen(true)
  }


  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  const Option = (props) => {
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
          <span className="link-stock-symbol">{props.data.subLabel} {truncateString(props.data.label, 40)}</span>
          <span className="user-location">{props.data.location}</span>
        </Link>
      </components.Option>
    );
  }
  const IndicatorsContainer = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };
  const ValueContainer = (props) => (
    <components.ValueContainer {...props}></components.ValueContainer>
  );

    const searchResults = props.listOfUsers;
    console.log(searchResults);
    const searchOptions = searchResults.map(({ first_name, last_name, location }) => {
      return {
        value: first_name,
        label: last_name,
        subLabel: first_name,
        location: location,
      };
    });
    const selectedOption = props.selectedOption;
    const Option = Option;
    const IndicatorsContainer = IndicatorsContainer;
    const ValueContainer = ValueContainer;

    const employeeProfile = () => {
      <div className="employee-profile-container">Profile</div>
    }
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
              onChange={this.props.handleSelect}
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
        <Drawer anchor='left'
      </div>
    );
}

export default Search;