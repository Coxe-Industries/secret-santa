import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';

import FamilyNameForm from './components/forms/FamilyNameForm';
import FamilyMemberForm from './components/forms/FamilyMemberForm';
import FamilyMemberList from './components/presentational/FamilyMemberList';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const MainAppBar = ({ showFamilyList }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={showFamilyList}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Secret Santa
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

class App extends PureComponent {
  state = {
    showFamilyList: true,
    familyName: "",
    familyMembers: [
      {
        id: "0123456789",
        name: "Kevin",
        email: "kevcoxe@gmail.com",
        list: [
          {
            title: "All New Echo Dot (3nd Gen) - Smart speaker with Alexa - Charcoal",
            url: "https://www.amazon.com/dp/B0792KTHKJ/ref=fs_ods_aucc_dt"
          }
        ],
      },
    ],
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  showFamilyList = () => {
    this.setState({
      showFamilyList: true
    })
  }

  hideFamilyList = () => {
    this.setState({
      showFamilyList: false
    })
  }

  setFamilyName = (values) => {
    this.setState({
      familyName: values.familyName
    })
  }

  addFamilyMember = (values) => {
    const { name, email } = values;
    const newMember = {
      name: name,
      email: email,
      list: []
    }
    this.setState({
      familyMembers: [
        newMember,
        ...this.state.familyMembers,
      ]
    })
  }

  render() {
    const { showFamilyList, familyName, familyMembers } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <MainAppBar
          showFamilyList={this.showFamilyList}
        />
        <div className="App">
          <h1>family name: {familyName}</h1>
          <FamilyNameForm
            familyName={familyName}
            onSubmit={this.setFamilyName}
          />
          <div>
            <FamilyMemberForm 
              onSubmit={this.addFamilyMember}
            />
          </div>
        </div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={showFamilyList}
        >
          <div>
            <IconButton onClick={this.hideFamilyList}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <FamilyMemberList
            familyMembers={familyMembers}
          />
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default App;
