import React from 'react';
import Link from 'next/link';
import { Paper, Button, IconButton, Avatar, ListItem, List } from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  CreateOutlined as PenIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearUserData, selectUserData, setUserData } from '@/redux/slices/user';
import { PostItem } from '@/utils/api/types';
import { Api } from '@/utils/api';

import useComponentVisible from '@/hooks/useComponentVisible';
import { toggleSwitchLeftMenu } from '@/redux/slices/left-menu';
import { UserProfileDropDown } from '../UserProfileDropDown';
import { destroyCookie } from 'nookies';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const [authVisible, setAuthVisible] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState('');
  const [posts, setPosts] = React.useState<PostItem[]>([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    try {
      const { items } = await Api().post.search({ title: searchValue });
      setPosts(items);
    } catch (err) {
      console.warn('Search post went wrong', err);
    }
  };

  React.useEffect(() => {
    if (searchValue === '') {
      setPosts((arr) => arr.splice(0, arr.length));
    }
  }, [searchValue, ref]);

  React.useEffect(() => {
    if (userData && authVisible) {
      setAuthVisible(false);
    }
  }, [userData, authVisible]);

  const leftMenuSwitchHandler = () => {
    dispatch(toggleSwitchLeftMenu());
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(clearUserData());
    destroyCookie({}, 'authToken');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton onClick={leftMenuSwitchHandler}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <img
            height={35}
            className="mr-20"
            src="https://logos-download.com/wp-content/uploads/2019/01/Tjournal_Logo-700x700.png"
            alt="Logo"
          />
        </Link>
        <div className={styles.searchBlock}>
          <SearchIcon></SearchIcon>

          <input
            ref={ref}
            value={searchValue}
            onChange={handleChangeInput}
            onClick={() => setIsComponentVisible(true)}
            placeholder="Поиск"
          />
          {isComponentVisible && posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <ListItem button>{obj.title}</ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>
        <Link href={'/write'}>
          <Button variant="contained" className={styles.penButton}>
            Новая запись
          </Button>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <>
            <Link href={`/profile/${userData.id}`} className="d-flex align-center">
              <Avatar className={styles.avatar}>{userData.fullName[0]}</Avatar>
            </Link>
            <ArrowBottom className={styles.arrowBottom} onClick={handleClick} />

            <UserProfileDropDown
              handleLogout={handleLogout}
              anchorEl={anchorEl}
              handleClose={handleClose}></UserProfileDropDown>
          </>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon></UserIcon>
            Войти
          </div>
        )}
      </div>
      <AuthDialog visible={authVisible} onClose={closeAuthDialog}></AuthDialog>
    </Paper>
  );
};
