import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButtonComponent from './toggle_button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                }
            }}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function CommonTabComponent(props) {
    const [value, setValue] = React.useState(0);
    const { childTabName } = props;
    console.log("child", childTabName)

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        console.log("child event", event.value, newValue)
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
        }
    };
    const recievedDataFromChild = (e)=>{
        console.log("common-tab",e)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
            >

                {
                    childTabName.map((el) => (
                        <LinkTab key={el?.label} href={el?.id} label={el?.label} />
                    ))
                }



            </Tabs>
            {
                childTabName[value].subChild?.length &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <ToggleButtonComponent tabName={childTabName[value].subChild} childToParentSendDataMethod={(e) => recievedDataFromChild(e)}></ToggleButtonComponent>
                        </Item>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}
