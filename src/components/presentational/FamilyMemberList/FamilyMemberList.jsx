
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const WishListItem = ({ classes, item: { title, url } }) => {
    const openUrl = () => {
        window.open(url, '_blank');
    }

    return (
      <ListItem button onClick={openUrl} className={classes.nested}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText inset primary={title} />
      </ListItem>
    )
}

const WishList = ({ classes, open, list }) => {
    const listItems = list.map((item, i) => {
        return (
            <WishListItem
                item={item}
                key={i}
                classes={classes}
            />
        )
    })

    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {listItems}
        </List>
      </Collapse>
    )
}


class FamilyMember extends PureComponent {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
      const { open } = this.state;
      const { classes, member } = this.props;
      const { name, email, list } = member;
      return (
        <Fragment>
          <ListItem button onClick={this.handleClick} alignItems="flex-start">
            <Badge className={classes.margin} badgeContent={list.length} color="primary" invisible={list.length <= 0}>
                <Avatar>
                    <ListIcon />
                </Avatar>
            </Badge>
            <ListItemText
            primary={name}
            secondary={
                <Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                    {email}
                </Typography>
                </Fragment>
            }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <WishList
            open={open}
            list={list}
            {...this.props}
          />
        </Fragment>
      )
  }

}

FamilyMember.propTypes = {
  classes: PropTypes.object.isRequired,
};

class FamilyMemberList extends PureComponent {
  render() {
    const { classes, familyMembers } = this.props;

    const memberList = familyMembers.map((member, i) => {
        return (
            <FamilyMember
                member={member}
                key={i}
                {...this.props}
            />
        )
    })

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Secret Santa Members</ListSubheader>}
        className={classes.root}
      >
        {memberList}
      </List>
    );
  }
}

FamilyMemberList.propTypes = {
  classes: PropTypes.object.isRequired,
  familyMembers: PropTypes.array.isRequired,
};

export default withStyles(styles)(FamilyMemberList);