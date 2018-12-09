import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MemberForm from '../../forms/MemberForm';
import MemberList from '../MemberList';
import MaxWidthDialog from '../MaxWidthDialog';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    minHeight: theme.spacing.unit * 20,
  },
  memberList: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const MemberListContainer = (props) => {
  const {
    classes,
    updateMatches,
    initialMembers=[
      {
        name: "Mom",
      },
      {
        name: "Dad",
      },
      {
        name: "Kevin",
      },
      {
        name: "Rebekah",
      },
      {
        name: "Maddie",
      },
      {
        name: "Ellie",
      },
      {
        name: "Bethany",
      },
      {
        name: "Tom",
      },
    ]
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [members, setMembers] = useState(initialMembers);

  const addMember = (values) => {
    const { name } = values;
    setMembers([
      {
        name: name
      },
      ...members
    ]);
    setModalOpen(false);
  }

  const matchMembers = () => {
    let remainingChoices = [...members];
    let matches = []

    members.forEach((member) => {
      const randomIndex = Math.floor(Math.random()*remainingChoices.length)
      matches.push([member, remainingChoices[randomIndex]])
      remainingChoices.splice(randomIndex, 1)
    })
    updateMatches(matches);
  }

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          List of people in the secret santa.
        </Typography>
        <Typography component="p">
          You can add people to the list. It will then pair people up.
        </Typography>

        <div className={classes.memberList}>
          <MemberList
            members={members}
          />
        </div>

        <Button variant="contained" className={classes.button} onClick={matchMembers}>
          Combine
        </Button>

        <Fab className={classes.fab} color="primary" aria-label="Add" onClick={() => setModalOpen(true)}>
          <AddIcon />
        </Fab>
      </Paper>
      <MaxWidthDialog
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title="Add new member to the secret santa pool."
        content={
          <MemberForm
            onSubmit={addMember}
          />
        }
      />
    </div>
  );
}

MemberListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  updateMatches: PropTypes.func.isRequired,
};

export default withStyles(styles)(MemberListContainer);
