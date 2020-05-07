import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton,
    List, ListItem, ListItemIcon, Toolbar, makeStyles, useTheme, Typography,
    ListItemText, 
} from '@material-ui/core'

import {Card, CardMedia,CardActions, Grid} from '@material-ui/core'
import img from '../img/b.jpg'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            //   width: `calc(100% - ${drawerWidth}px)`,
            //   marginLeft: drawerWidth,
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        // backgroundColor:"red",
        // color:"white"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    // card styles
    cardItem: {
        margin:"1%"
      },
      all: {
        flexGrow: 1,
      },
      media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
      },
      Card:{
        padding: theme.spacing(2),
      }
}));

function Home(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <Divider />
                <ListItem button >
                    <ListItemIcon><InboxIcon color="white" /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Hostel Masters
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.toolbar} />

                
                <div className={classes.all}>
                        <Grid container >
                            <Grid item xs={12} md={4}>
                                <Card className={classes.cardItem}>
                                <CardMedia
                                    className={classes.media}
                                    image={img}
                                    title="Paella dish"
                                />
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                    Ayeduase
                                    </IconButton>
                                </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                </div>
            </main>

        </div>
    );
}


export default Home;
