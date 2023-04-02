import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NavBar from './core/NavBar';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

const drawerWidth = 240;

export default function SideBar() {
    return (
        <Grid item xs={12} md={3} lg={3} xl={3}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        ['& .MuiDrawer-paper']: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                                (text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? (
                                                    <InboxIcon />
                                                ) : (
                                                    <MailIcon />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map(
                                (text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? (
                                                    <InboxIcon />
                                                ) : (
                                                    <MailIcon />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Grid>
    );
}
