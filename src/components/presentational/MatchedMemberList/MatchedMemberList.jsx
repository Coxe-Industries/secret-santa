import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';

const Member = ({ pair: [giver, reciever] }) => {
  return (
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={`${giver.name} -> ${reciever.name}`} />
    </ListItem>
  )
}

const MatchedMemberList = (props) => {
  const { pairs } = props;
  const list = pairs.map((pair, i) => <Member pair={pair} key={i} />)
  return (
    <Fragment>
      {pairs.length > 0 && (
        <Paper elevation={2}>
          <List component="nav">
            {list}
          </List>
        </Paper>
      )}
    </Fragment>
  );
}

export default MatchedMemberList;
