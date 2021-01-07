import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import AppSideBarNavWithItemCounts from './AppSideBarNavWithItemCounts';


import {
  // AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav';
// routes config
// import routes from '../../routes';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const Dashboard = React.lazy(() => import('../../views/Dashboard'));
const Users = React.lazy(() => import('../../views/Users/Users'));
const User = React.lazy(() => import('../../views/Users/User'));
const Categories = React.lazy(() => import('../../views/Categories/Categories'));
const Category = React.lazy(() => import('../../views/Categories/Category'));
const Plants = React.lazy(() => import('../../views/Plants/Plants'));
const Plant = React.lazy(() => import('../../views/Plants/Plant'));
const Varieties = React.lazy(() => import('../../views/Varieties/Varieties'));
const Variety = React.lazy(() => import('../../views/Varieties/Variety'));
const Antinutrients = React.lazy(() => import('../../views/Attributes/Antinutrients'));
const GrowthHabits = React.lazy(() => import('../../views/Attributes/GrowthHabits'));
const Tolerances = React.lazy(() => import('../../views/Attributes/Tolerances'));
const KoClimateZones = React.lazy(() => import('../../views/Attributes/KoClimateZones'));


class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    const routes = [
      { path: '/', exact: true, name: 'Home' },
      { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
      { path: '/categories', exact: true, name: 'Categories', component: Categories },
      { path: '/categories/:id', name: 'Category', component: Category },
      { path: '/plants', exact: true, name: 'Plants', component: Plants },
      { path: '/plants/:id', name: 'Plant', component: Plant },
      { path: '/varieties', exact: true, name: 'Varieties', component: Varieties },
      { path: '/variety/:id', name: 'Variety', component: Variety },
      { path: '/attributes/antinutrients', name: 'Antinutrients', component: Antinutrients },
      { path: '/attributes/growth-habits', name: 'Growth Habits', component: GrowthHabits },
      { path: '/attributes/tolerances', name: 'Tolerances', component: Tolerances },
      { path: '/attributes/koppen-climate-zones', name: 'Köppen Climate Zones', component: KoClimateZones },
      { path: '/users', exact: true,  name: 'Users', component: Users },
      { path: '/users/:id', exact: true, name: 'User Details', component: User },
    ];
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSideBarNavWithItemCounts {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/*
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
          */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;