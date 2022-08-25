import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import AddUser from "./AddUser";
import AllUser from "./AllUser";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";


const UserRoute = () => {
    return (
        <>
            <Switch>
                <Route path={`/all`} component={AllUser}></Route>
                <Route path={`/create`} component={AddUser}></Route>
                <Route path={`/update-profile/:id`} component={UpdateProfile}></Route>
                <Route path={`/update-password/:id`} component={UpdatePassword}></Route>
            </Switch>
        </>
    );
}

export default UserRoute;