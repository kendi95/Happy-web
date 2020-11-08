import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import RegisteredOrphanages from '../pages/Dashboard/RegisteredOrphanages';
import PendingOrphanages from '../pages/Dashboard/PendingOrphanages';
import ExcludeOrphanage from '../pages/ExcludeOrphanage';
import CreateDoneOrphanage from '../pages/CreateDoneOrphanage';
import EditOrphanage from '../pages/EditOrphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/create/done" component={CreateDoneOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/dashboard/registered-orphanages"exact component={RegisteredOrphanages} />
        <Route path="/dashboard/pending-orphanages" exact component={PendingOrphanages} />

        <Route path="/dashboard/exclude-orphanages" exact component={ExcludeOrphanage} />
        <Route path="/dashboard/edit-orphanages" exact component={EditOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes; 