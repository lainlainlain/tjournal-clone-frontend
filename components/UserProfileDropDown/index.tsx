import { useRouter } from 'next/router';
import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './UserProfileDropDown.module.scss';
import { Avatar } from '@material-ui/core';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import Link from 'next/link';

interface UserProfileDropDownProps {
  anchorEl: Element | null;
  handleClose: () => void;
  handleLogout: () => void;
}

export const UserProfileDropDown: React.FC<UserProfileDropDownProps> = ({
  anchorEl,
  handleClose,
  handleLogout,
}) => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  const open = Boolean(anchorEl);

  return (
    <Menu
      elevation={2}
      id="fade-menu"
      classes={{ paper: styles.menu }}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      PaperProps={{
        style: {
          padding: '6px 12px',
          left: '-150%',
          transform: 'translateX(-10%) translateY(22%)',
        },
      }}>
      <p>Мой профиль</p>
      <div style={{ marginBottom: '25px' }}>
        <Link href={`/profile/${userData?.id}`}>
          <MenuItem onClick={handleClose} classes={{ root: styles.menuItem }}>
            <Avatar>{userData?.fullName[0]}</Avatar>
            <div className={styles.userCard}>
              <span className={styles.userCard__name}>{userData?.fullName}</span>
              <span className={styles.userCard__sub_label}>Личный блог</span>
            </div>
          </MenuItem>
        </Link>
      </div>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon
          style={{
            marginRight: '16px',
          }}
        />{' '}
        Выйти
      </MenuItem>
    </Menu>
  );
};
