import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
    root:{
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const Register = (props) => {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        props.getRoles()
    }, [])

    const handleRegister = () => {
        props.history.push('/login');
        props.register(username, password, role);
    }

    return (
        <React.Fragment>
            <Paper className={classes.root} variant={"elevation"}>
                <Typography variant={"h5"}>
                    Register
                </Typography>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="loginPassword"
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        fullWidth
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="registerPassword"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        fullWidth
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    >
                        {props.roles ? props.roles.map(role => (
                            <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                        )) : null}
                    </Select>
                </FormControl>
                <Button onClick={handleRegister} variant={"outlined"} color={"primary"}>
                    Register
                </Button>
            </Paper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        roles: state.authReducer.roles,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, password, role) => dispatch(actions.register(username, password, role)),
        getRoles: () => dispatch(actions.getRoles()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
