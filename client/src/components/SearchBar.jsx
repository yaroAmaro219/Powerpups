import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";

import '../styles/SearchBar.css';
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const indicatorSeparatorStyle = {
    display: 'none',
  };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchInput: "",
      selectedOption: null,
      searchClicked: false,
    };
  }

  handleProfileOpen = () => {
    this.setState({
      open: true 
    });
  }

  handleProfileClose = () => {
    this.setState({
      open: false
    });
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
          onClick={this.handleProfileOpen}
          to={{
            pathname: "/",
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
    // console.log(searchResults);
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
          <form className="form-container" onChange={this.props.onSearchChange}>
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
        <Dialog
          className="profile-modal-container"
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleProfileClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle className="profile-header" id="alert-dialog-slide-title">{"Clint Osterholz"}</DialogTitle> */}
          <DialogContent className="profile-content">
            <img
              className="profile-image"
              src={require("/Users/carrielipper/Documents/General_Assembly/SEI/post_sei/datadog-hackathon-app/Powerpups/client/src/images/screencapture-keep-google-u-0-2020-05-22-12_42_46.png")}
              alt="profile-picture"
            ></img>
            <div className="profile-introduction">
              <i className="away-status"><FiberManualRecordIcon /></i>
              <span className="profile-name">Clint</span>
              <span className="profile-last-name">Osterholz</span>
              <span className="profile-pronouns">(He/Him)</span>
            </div>

            <div className="employee-title">Sales Engineer</div>

            <div className="profile-subcontainer">
              <i className="profile-icon"><LocationOnIcon /></i>
              <div className="profile-data">New York, NY</div>
            </div>
            <div className="profile-subcontainer">
              <i className="profile-icon"><CallIcon /></i>
              <div className="profile-data">917-234-5678</div>
            </div>
            <div className="profile-subcontainer">
              <i className="profile-icon"><EmailIcon /></i>
              <div className="profile-data">clint@fakemail.com</div>
            </div>
            <div className="profile-subcontainer">
              <i className="profile-icon"><AccessTimeIcon /></i>
              <div className="profile-data">9:57 p.m.</div>
            </div>
            

          </DialogContent>
          <DialogActions className="profile-footer">
            {/* <Button onClick={this.handleProfileClose} color="primary">
              Message
            </Button>
            <Button onClick={this.handleProfileClose} color="primary">
              Add to Team
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SearchBar;