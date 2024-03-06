import React, { useState, useEffect } from 'react';
import {
    Checkbox,
    FormGroup,
    FormControlLabel,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    Radio,
    RadioGroup,
    FormControl,
    Box,
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Typography,
    Grid,
    Paper,
    styled
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
}));
export default function CommonFilter({ fields, onFilterChange, filterTitle }) {
    const [state, setState] = React.useState({
        right: false,
    });
    console.log("fields",fields)

    const initialFilters = fields.reduce((acc, field) => {
        acc[field.name] = field.type === 'checkbox' ? [] : field.type === 'radio' ? '' : '';
        return acc;
    }, {});
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        // Pass the filter values to the parent component
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const handleFieldChange = (name, value) => {
        console.log("handler",name,value)
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
        setState({ ...state, right: false });
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ height: '100vh',
            overflowY: 'auto',
            width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 ,
           
        }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >

            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item sm={12} md={12}>
                    <Item>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <Typography style={{ margin: '10px', padding: '5px', borderBlock: '0px 2px 5px 0px', fontWeight: 'bold' }}>
                                {filterTitle}
                            </Typography>
                            <Typography style={{ margin: '10px', padding: '5px', borderBlock: '0px 2px 5px 0px', fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleDrawer(anchor, false)}>
                                <ClearRoundedIcon />
                            </Typography>
                        </div>
                    </Item>
                </Grid>
            </Grid>
            <Divider />
            <List>
                {fields.map((field) => (
                    <div key={field.name}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {field.type === 'checkbox' ? (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} style={{ marginBottom: '16px' }}>
                                                <Item>
                                                    <FormGroup>
                                                        <FormControlLabel fullWidth size="small" sx={{ minWidth: 120, width: '100%' }}
                                                            control={
                                                                <Checkbox
                                                                    checked={filters[field.name].length > 0}
                                                                    onChange={() =>
                                                                        handleFieldChange(
                                                                            field.name,
                                                                            filters[field.name].length > 0 ? [] : [field.options[0]]
                                                                        )
                                                                    }

                                                                />
                                                            }
                                                            label={field.label}
                                                        />
                                                    </FormGroup>
                                                </Item>
                                            </Grid>
                                        </Grid>


                                    ) : field.type === 'select' ? (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} style={{ marginBottom: '16px' }}>
                                                <Item>
                                                    <FormControl fullWidth sx={{ minWidth: 120, width: 300 }}>
                                                        <InputLabel id="demo-multiple-checkbox-label">{field.label}</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-seingleSelect-checkbox"
                                                            // value={filters[field.name]}
                                                            value={filters}
                                                            onChange={(event) =>
                                                                handleFieldChange(field.name, event.target.value)
                                                            }
                                                            input={<OutlinedInput label={field.label} />}
                                                            renderValue={(selected) => selected}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {field.options.map((option) => (
                                                                <MenuItem key={option} value={option}>
                                                                    {/* <Checkbox checked={filters[field.name].indexOf(option) > -1} /> */}
                                                                    <ListItemText primary={option.name} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Item>
                                            </Grid>
                                        </Grid>

                                    ) : field.type === 'multiSelect' ? (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} style={{ marginBottom: '16px' }}>
                                                <Item>
                                                    <FormControl fullWidth sx={{ minWidth: 120, width: 300 }}>
                                                        <InputLabel id="demo-multiple-checkbox-label">{field.label}</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            // value={filters[field.name] || []}
                                                            value={[...([filters] || [])]}
                                                            onChange={(event) =>
                                                                handleFieldChange(field.name, event.target.value)
                                                            }
                                                            input={<OutlinedInput label={field.label} />}
                                                            // renderValue={(selected) => selected.join(', ')}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {field.options.map((option,i) => (
                                                                <MenuItem key={option.id} value={option}>
                                                                    {/* <Checkbox checked={filters[field.name].includes(option)} /> */}
                                                                    <Checkbox checked={(Array.isArray(filters) ? filters : []).some(item => item.id === option.id)} />

                                                                    <ListItemText primary={option.name} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Item>
                                            </Grid>
                                        </Grid>

                                    )
                                        : field.type === 'radio' ? (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} style={{ marginBottom: '16px' }}>
                                                    <Item>
                                                        <FormControl component="fieldset" fullWidth size="small" sx={{ minWidth: 120 }}>
                                                            <RadioGroup
                                                                row
                                                                aria-label={field.label}
                                                                name={field.name}
                                                                value={filters[field.name]}
                                                                onChange={(event) =>
                                                                    handleFieldChange(field.name, event.target.value)
                                                                }
                                                            >
                                                                {field.options.map((option) => (
                                                                    <FormControlLabel
                                                                        key={option}
                                                                        value={option}
                                                                        control={<Radio />}
                                                                        label={option}
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Item>
                                                </Grid>
                                            </Grid>

                                        ) : (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} style={{ marginBottom: '16px' }}>
                                                    <Item>
                                                        <TextField
                                                            label={field.label}
                                                            type={field.type}
                                                            id={field.name}
                                                            value={filters[field.name] || ''}
                                                            onChange={(event) =>
                                                                handleFieldChange(field.name, event.target.value)
                                                            }

                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                             sx={{ minWidth: 120, width: 300 }}
                                                        />
                                                    </Item>
                                                </Grid>
                                            </Grid>

                                        )}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </div>
                ))}
                <div style={{
                    position: 'sticky',
                    bottom: 0,
                    marginTop: 'auto',
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: 'white'
                    }}>
                <Button variant="contained" style={{background:'white',color:'black',margin:'0px 5px'}} onClick={resetFilters} spacing={2}>
                    Reset
                </Button>
                <Button variant="contained" onClick={toggleDrawer(anchor, false)}>
                    Apply
                </Button>
                </div>
            </List>
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Filter</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        // onClose={toggleDrawer(anchor, false)}
                        // onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
