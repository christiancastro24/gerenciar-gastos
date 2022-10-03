import { Switch, Route } from "react-router-dom";
import { DashboarDecember } from "../components/dashboardDecember";
import { DashboardNovember } from "../components/dashboardNovember";
import { DashboardOctober } from "../components/dashboardOctober";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/"> <DashboardOctober /> </Route>
            <Route path="/dashboardNovember"> <DashboardNovember /> </Route>
             <Route path="/dashboardDecember"> <DashboarDecember /> </Route>
        </Switch>
    )
}

