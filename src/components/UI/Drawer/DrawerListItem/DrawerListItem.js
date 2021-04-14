import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "inline-flex",
        padding: "16px",
        textDecoration: "none"
    }
})

const DrawerListItem = (props) => {
    const classes = useStyles();

    return (
        <ListItem button
                  style={{padding: "0"}}>
            <NavLink
                to={props.to}
                className={classes.root}
                activeStyle={{backgroundColor: "#dddddd"}}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <Typography variant={props.fontStyle}>
                    {props.text}
                </Typography>
            </NavLink>
        </ListItem>
    )
}

export default withRouter(DrawerListItem);
