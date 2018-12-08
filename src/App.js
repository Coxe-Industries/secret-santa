import React, { PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      </MuiThemeProvider>
    );
  }
}

export default App;
