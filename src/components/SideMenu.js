import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../firebase';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => setIsOpen(open);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Logout', icon: <LogoutIcon />, action: () => {
        signOutUser();
        navigate('/login');
      }
    },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} className="text-white">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 bg-primary h-full text-secondary">
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                className="hover:bg-white hover:text-primary"
                onClick={item.action ? item.action : () => navigate(item.path)}
              >
                <ListItemIcon className="text-secondary">{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
