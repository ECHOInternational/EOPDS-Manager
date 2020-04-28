  
import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Container } from 'reactstrap';
import SideBarNavLoader from '../../loaders/SideBarNavLoader';

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
import routes from '../../routes';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
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

const GET_CATEGORIES = gql`
  {
    categories{
      totalCount
    }
  }
`  

const AppSideBarNavWithItemCounts = (props) => {
   const {loading, error, data } = useQuery(GET_CATEGORIES);

    if (loading) return <SideBarNavLoader />;
    if (error) return `Error! ${error.message}`


    const navigation = {
      items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'far fa-tachometer-alt',
      },
      {
        title: true,
        name: 'Plant Data',
      },
      {
        name: "Categories",
        url: '/categories',
        icon: 'fad fa-folder-tree',
        badge: {
          variant: 'secondary',
          text: `${data.categories.totalCount}`,
        },
      },
      {
        name: "Plants",
        url: '/plants',
        icon: 'fad fa-trees',
         badge: {
          variant: 'secondary',
          text: 'XXX',
        },
      },
      {
        name: "Varieties",
        url: '/varieties',
        icon: 'fad fa-seedling',
        badge: {
          variant: 'secondary',
          text: 'XXXX',
        },
      },
      {
        title: true,
        name: 'Plant Attributes',
      },
      {
        name: "Antinutrients",
        url: '/attributes/antinutrients',
        icon: 'icon-shield'
      },
      {
        name: "Growth Habits",
        url: '/attributes/growth-habits',
        icon: 'icon-chart'
      },
      {
        name: "Tolerances",
        url: '/attributes/tolerances',
        icon: 'icon-directions'
      },
      {
        name: 'Climate Zones',
        icon: 'icon-map',
        children: [
          {
            name: "Köppen",
            url: '/attributes/koppen-climate-zones',
          },
        ]
      },
      ]
    }

  return <AppSidebarNav navConfig={navigation} {...props} router={router}/>
}

export default DefaultLayout;