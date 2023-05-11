import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// actions
import { changeSidebarType } from '../redux/actions';

// store
import { RootState, AppDispatch } from '../redux/store';

//constants
import { LayoutTypes, SideBarTypes } from '../constants/layout';

// components
import TopbarSearch from '../components/TopbarSearch';
import SearchDropdown from '../components/SearchDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';

import profilePic from '../assets/images/users/user-1.jpg';
import avatar4 from '../assets/images/users/user-4.jpg';
import logoSm from '../assets/images/logo-sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoDark2 from '../assets/images/logo-dark-2.png';
import logoLight from '../assets/images/logo-light.png';
import logoLight2 from '../assets/images/logo-light-2.png';

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
}

// get the notifications
const Notifications: NotificationItem[] = [
  {
    id: 1,
    text: 'Cristina Pride',
    subText: 'Hi, How are you? What about our next meeting',
    avatar: profilePic,
  },
  {
    id: 2,
    text: 'Caleb Flakelar commented on Admin',
    subText: '1 min ago',
    icon: 'mdi mdi-comment-account-outline',
    bgColor: 'primary',
  },
  {
    id: 3,
    text: 'Karen Robinson',
    subText: 'Wow ! this admin looks good and awesome design',
    avatar: avatar4,
  },
  {
    id: 4,
    text: 'New user registered.',
    subText: '5 hours ago',
    icon: 'mdi mdi-account-plus',
    bgColor: 'warning',
  },
  {
    id: 5,
    text: 'Caleb Flakelar commented on Admin',
    subText: '1 min ago',
    icon: 'mdi mdi-comment-account-outline',
    bgColor: 'info',
  },
  {
    id: 6,
    text: 'Carlos Crouch liked Admin',
    subText: '13 days ago',
    icon: 'mdi mdi-heart',
    bgColor: 'secondary',
  },
];

// dummy search results
const SearchResults = [
  {
    id: 1,
    title: 'Analytics Report',
    icon: 'uil-notes',
    redirectTo: '#',
  },
  {
    id: 2,
    title: 'How can I help you?',
    icon: 'uil-life-ring',
    redirectTo: '#',
  },
  {
    id: 3,
    icon: 'uil-cog',
    title: 'User profile settings',
    redirectTo: '#',
  },
];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
}

const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}: TopbarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));
  const [isopen, setIsopen] = useState<boolean>(false);
  // get the profilemenu
  const ProfileMenus = [
    {
      label: t('My Account'),
      icon: 'fe-user',
      redirectTo: '/my-account',
    },
    {
      label: t('Settings'),
      icon: 'fe-settings',
      redirectTo: '/settings',
    },
    {
      label: t('Logout'),
      icon: 'fe-log-out',
      redirectTo: '/auth/logout',
    },
  ];
  const navbarCssClasses: string = navCssClasses || '';
  const containerCssClasses: string = !hideLogo ? 'container-fluid' : '';

  const { layoutType, leftSideBarType } = useSelector((state: RootState) => ({
    layoutType: state.Layout.layoutType,
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen(!isopen);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  /**
   * Toggles the left sidebar width
   */
  const toggleLeftSidebarWidth = () => {
    if (leftSideBarType === 'default' || leftSideBarType === 'compact')
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    if (leftSideBarType === 'condensed')
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
  };

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navbarCssClasses}`}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <div className="logo-box">
              <Link to="/" className="logo logo-dark text-center">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img
                    src={
                      layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                        ? logoDark2
                        : logoDark
                    }
                    alt=""
                    height="20"
                  />
                </span>
              </Link>
              <Link to="/" className="logo logo-light text-center">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img
                    src={
                      layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                        ? logoLight2
                        : logoLight
                    }
                    alt=""
                    height="20"
                  />
                </span>
              </Link>
            </div>
          )}

          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li className="d-none d-lg-block">
              <TopbarSearch items={SearchResults} />
            </li>

            <li className="dropdown d-inline-block d-lg-none">
              <SearchDropdown />
            </li>
            <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
              <LanguageDropdown />
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <NotificationDropdown notifications={Notifications} />
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <ProfileDropdown menuItems={ProfileMenus} user={user} />
            </li>
          </ul>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            {layoutType !== LayoutTypes.LAYOUT_HORIZONTAL && (
              <li>
                <button
                  className="button-menu-mobile waves-effect waves-light d-none d-lg-block"
                  onClick={toggleLeftSidebarWidth}
                >
                  <i className="fe-menu"></i>
                </button>
              </li>
            )}

            <li>
              <button
                className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                onClick={handleLeftMenuCallBack}
              >
                <i className="fe-menu" />
              </button>
            </li>

            {/* Mobile menu toggle (Horizontal Layout) */}
            <li>
              <Link
                to="#"
                className={classNames('navbar-toggle nav-link', {
                  open: isopen,
                })}
                onClick={handleLeftMenuCallBack}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
