import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { Avatar } from './Avatar';

interface ProfileMenuItem {
  label: string;
  icon: string;
  redirectTo: string;
}

interface IUser {
  firstName: string;
  lastName: string;
}

interface ProfileDropdownProps {
  menuItems: Array<ProfileMenuItem>;
  profilePic?: string;
  user: IUser;
  userTitle?: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  user,
  profilePic,
  menuItems,
  userTitle,
}) => {
  const userPic = profilePic || null;

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-profile"
        as="a"
        onClick={toggleDropdown}
        className={classNames(
          'nav-link nav-user me-0 waves-effect waves-light',
          { show: dropdownOpen }
        )}
      >
        {userPic ? (
          <img src={userPic!} className="rounded-circle" alt="" />
        ) : user ? (
          <Avatar name={user.firstName} secondName={user.lastName} size="sm" />
        ) : null}

        <span className="pro-user-name ms-1">
          {user ? user.firstName : 'unknown'}{' '}
          <i className="mdi mdi-chevron-down"></i>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
        <div onClick={toggleDropdown}>
          {(menuItems || []).map((item, i) => {
            return (
              <React.Fragment key={i}>
                {i === menuItems.length - 1 && (
                  <div className="dropdown-divider"></div>
                )}
                <Link
                  to={item.redirectTo}
                  className="dropdown-item notify-item"
                  key={i + '-profile-menu'}
                >
                  <i className={`${item.icon} me-1`}></i>
                  <span>{item.label}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
