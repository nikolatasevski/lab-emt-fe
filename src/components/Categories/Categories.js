import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title:{
        padding: "0 0 2em 0"
    }
}));


const Categories = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.getCategories()
    }, [])

    return (
        <React.Fragment>
            <Typography variant={"h5"} className={classes.title}>
                Categories
            </Typography>
            <Paper variant={"elevation"}>
                <List component="nav" className={classes.root} aria-label="contacts">
                    {props.categories ? props.categories.map((category, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText primary={category}/>
                            </ListItem>
                        )
                    ) : null}
                </List>
            </Paper>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.bookReducer.categories,
        error: state.bookReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(actions.getCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));
