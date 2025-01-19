import { Switch, Route } from "react-router-dom";
import { DashboardJanuary } from "../components/dashboardJanuary";
import { DashboardFebruary } from "../components/dashboardFebruary";
import { DashboardMarch } from "../components/dashboardMarch";
import { DashboardApril } from "../components/dashboardApril";
import { DashboardMay } from "../components/dashboardMay";
import { DashboardJune } from "../components/dashboardJune";
import { DashboardJuly } from "../components/dashboardJuly";
import { DashboardAugust } from "../components/dashboardAugust";
import { DashboardSeptember } from "../components/dashboardSeptember";
import { DashboardOctober } from "../components/dashboardOctober";
import { DashboardNovember } from "../components/dashboardNovember";
import { DashboardDecember } from "../components/dashboardDecember";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/"> <DashboardJanuary /> </Route>
            <Route path="/dashboard/January"> <DashboardJanuary /> </Route>
            <Route path="/dashboard/February"> <DashboardFebruary /> </Route>
            <Route path="/dashboard/March"> <DashboardMarch /> </Route>
            <Route path="/dashboard/April"> <DashboardApril /> </Route>
            <Route path="/dashboard/May"> <DashboardMay /> </Route>
            <Route path="/dashboard/June"> <DashboardJune /> </Route>
            <Route path="/dashboard/July"> <DashboardJuly /> </Route>
            <Route path="/dashboard/August"> <DashboardAugust /> </Route>
            <Route path="/dashboard/September"> <DashboardSeptember /> </Route>
            <Route path="/dashboard/October"> <DashboardOctober /> </Route>
            <Route path="/dashboard/November"> <DashboardNovember /> </Route>
            <Route path="/dashboard/December"> <DashboardDecember /> </Route>
        </Switch>
    );
}
