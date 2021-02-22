import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import SideBarNavLoader from '../../loaders/SideBarNavLoader';
import * as router from 'react-router-dom';
import { AppSidebarNav2 as AppSidebarNav } from '@coreui/react';

const GET_COUNTS = gql`
  query ItemCounts{
    categories{
      totalCount
    },
    plants{
      totalCount
    },
    varieties{
      totalCount
    },
    locations{
      totalCount
    }
  }
`  

const AppSideBarNavWithItemCounts = (props) => {
   const { t } = useTranslation('navigation');
   const {loading, error, data } = useQuery(GET_COUNTS);

    if (loading) return <SideBarNavLoader />;
    if (error) return `Error! ${error.message}`


    const navigation = {
      items: [
      {
        name: `${t('Dashboard', 'Dashboard', 'Link to the application dashboard.')}`,
        url: '/dashboard',
        icon: 'far fa-tachometer-alt',
      },
      {
        title: true,
        name: 'Plant Data',
      },
      {
        name: `${t('plantCategory_short', {count: data.categories.totalCount, defaultValue: 'Category', context: 'A link to or header over a list of plant categories'})}`,
        url: '/categories',
        icon: 'fad fa-folder-tree',
        badge: {
          variant: 'secondary',
          text: `${data.categories.totalCount}`,
        },
      },
      {
        name: `${t('plant', {count: 1, defaultValue: 'Plant', context: 'A link to or header over a list of plants'})}`,
        url: '/plants',
        icon: 'fad fa-trees',
         badge: {
          variant: 'secondary',
          text: `${data.plants.totalCount}`,
        },
      },
      {
        name: `${t('plantVariety_short', {count: 1, defaultValue: 'Variety', context: 'A link to or header over a list of plant varieties'})}`,
        url: '/varieties',
        icon: 'fad fa-seedling',
        badge: {
          variant: 'secondary',
          text: `${data.varieties.totalCount}`,
        },
      },
      {
        title: true,
        name: `${t('plantAttribute_plural', {defaultValue: 'Plant Attributes', context: 'A heading over a list of plant attributes'})}`,
      },
      {
        name: `${t('antinutrient', {count: 1, defaultValue: 'Antinutrient', context: 'A link to or header over list of antinutrients'})}`,
        url: '/attributes/antinutrients',
        icon: 'icon-shield'
      },
      {
        name: `${t('growthHabit', {count: 1, defaultValue: 'Growth Habit', context: 'A link to or header over a list of growth habits'})}`,
        url: '/attributes/growth-habits',
        icon: 'icon-chart'
      },
      {
        name: `${t('tolerance', {count: 1, defaultValue: 'Tolerance', context: 'A link to or header over a list of plant tolerances'})}`,
        url: '/attributes/tolerances',
        icon: 'icon-directions'
      },
      {
        name: `${t('climateZone', {count: 1, defaultValue: 'Climate Zone', context: 'A link to or header over a list of climate zones'})}`,
        icon: 'icon-map',
        children: [
          {
            name: `${t('koppenClimateZone_short', {count:1, defaultValue: 'Köppen', context: 'A link to or header over a list of Köppen climate zones'})}`,
            url: '/attributes/koppen-climate-zones',
          },
        ]
      },
      ]
    }

  return <AppSidebarNav navConfig={navigation} {...props} router={router} className="animated fadeIn"/>
}

export default AppSideBarNavWithItemCounts;