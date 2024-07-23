/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {COLORS} from '../theme/colors';
import {BottomNavigation} from 'react-native-paper';
import HelpDeskIconSvg from './../../assets/icons/helpdeskIcon.svg';

import HomeIconSvg from './../../assets/icons/homeIcon.svg';
import ProfileIconSvg from './../../assets/icons/profileIcon.svg';
import NotificationIconSvg from './../../assets/icons/notificationIcon.svg';
import Dashboard from 'screens/dashboard/Dashboard.screen';
import ProfileScreen from 'screens/profile/Profile.screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {updateTabIndex} from 'store/redux/modalSlice';
import NotificationList from 'screens/notification/notificationList/NotificationList.screen';
import HelpDesk from 'screens/helpdesk/HelpDesk.screen';
import {getTranslationLabel} from 'utils/commonMethods';

interface IRoutes {
  key: string;
  title: string;
  focusedIcon: () => React.JSX.Element;
}

const TabNavigator = () => {
  const dispatch = useDispatch();
  const tabIndex = useSelector((state: RootState) => state.modal?.tabIndex);

  const routes = [
    {
      key: 'Home',
      title: getTranslationLabel('home'),
      focusedIcon: () => <HomeIconSvg />,
    },
    {
      key: 'Notification',
      title: getTranslationLabel('notification'),
      focusedIcon: () => <NotificationIconSvg />,
    },
    {
      key: 'Helpdesk',
      title: getTranslationLabel('helpdesk'),
      focusedIcon: () => <HelpDeskIconSvg />,
    },
    {
      key: 'Profile',
      title: getTranslationLabel('profile'),
      focusedIcon: () => <ProfileIconSvg />,
    },
  ];

  const handleTabChange = (newIndex: number) => {
    dispatch(updateTabIndex(newIndex));
  };

  const renderScene = ({route: routeScene}: {route: IRoutes}) => {
    if (routeScene.key !== routes[tabIndex].key && routeScene.key !== 'Home') {
      return null;
    }

    switch (routeScene.key) {
      case 'Home':
        return <Dashboard />;
      case 'Notification':
        return <NotificationList />;
      case 'Helpdesk':
        return <HelpDesk />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };
  return (
    <BottomNavigation
      navigationState={{index: tabIndex, routes}}
      onIndexChange={handleTabChange}
      renderScene={renderScene}
      barStyle={{backgroundColor: COLORS.backgroundYellow}}
      activeIndicatorStyle={{backgroundColor: COLORS.yellow}}
    />
  );
};

export default TabNavigator;
