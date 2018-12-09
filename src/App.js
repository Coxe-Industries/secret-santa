import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MemberListContainer from './components/presentational/MemberListContainer';
import MatchedMembersList from './components/presentational/MatchedMemberList';
import MaxWidthDialog from './components/presentational/MaxWidthDialog';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const MainAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Secret Santa
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const App = () => {

  const [showMatchedMembersDialog, setShowDialog] = useState(false)
  const [matchedMembers, setMatchedMembers] = useState([]);
  const updateMatchedMembers = (matches) => {
    setMatchedMembers(matches)
    setShowDialog(true)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <MainAppBar />
      <MemberListContainer
        updateMatches={updateMatchedMembers}
      />
      <MaxWidthDialog
        open={showMatchedMembersDialog}
        handleClose={() => setShowDialog(false)}
        title="Secret santa member pairs"
        content={
          <MatchedMembersList
            pairs={matchedMembers}
          />
        }
      />
    </MuiThemeProvider>
  );
}

export default App;
