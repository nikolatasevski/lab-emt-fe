import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
// import './DrawerList.css';
import DrawerListItem from "./DrawerListItem/DrawerListItem";
import {withRouter} from "react-router-dom";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CategoryIcon from '@material-ui/icons/Category';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "transparent",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function DrawerList(props) {
    const classes = useStyles();

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader style={{padding: '0', height: "65px"}} component="div" id="nested-list-subheader">
                </ListSubheader>
            }
            className={classes.root}
        >
            <Divider/>
            <DrawerListItem text="Books" fontStyle="button" to="/books" icon={<LibraryBooksIcon/>}/>
            <DrawerListItem text="Categories" fontStyle="button" to="/categories" icon={<CategoryIcon/>}/>
        </List>
    );
}

export default withRouter(DrawerList);
