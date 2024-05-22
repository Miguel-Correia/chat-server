import React from "react";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider } from "@mui/material";


function ContactBar(){
    return (
        <Box sx={{ height: '100%', width: '100%', paddingBottom: '3vh', borderRight: '5px', borderRightColor: 'black'}}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton component="a">
                    <ListItemText
                      sx={{ my: 0 }}
                      primary="WebChat"
                      primaryTypographyProps={{
                        fontSize: 20,
                        fontWeight: 'medium',
                        letterSpacing: 0,
                      }}
                    />
                </ListItemButton>
                <Divider />
                <ListItemButton selected>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="General"  />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Channel 2" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Channel 5"/>
                </ListItemButton>
            </List>
        </Box>
    );
}

export default ContactBar;