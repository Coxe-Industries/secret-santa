import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';

const Member = ({ member: { name } }) => {
  return (
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}

const MemberList = (props) => {
  const { members } = props;
  const list = members.map((member, i) => <Member member={member} key={i} />)
  return (
    <Fragment>
      {members.length > 0 && (
        <Paper elevation={2}>
          <List component="nav">
            {list}
          </List>
        </Paper>
      )}
    </Fragment>
  );
}

export default MemberList;
