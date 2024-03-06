import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function CardComponent(props) {
    const { cardResponse } = props
    let responseData
    console.log("cardResponse", cardResponse)
    if (cardResponse && cardResponse.data) {
        responseData = cardResponse.data;
        // Use responseData as needed
        console.log("$$$$$$:", responseData);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    responseData?.map((el, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Item>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <strong>{el[el?.short_key] ? el[el?.short_key]: 0}</strong>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {el?.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                                        <Stack direction="row"  >
                                            <Avatar alt="Remy Sharp" src={el?.indicator_icons} />
                                        </Stack>
                                    </Typography>
                                </CardContent>
                            </Item>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
}