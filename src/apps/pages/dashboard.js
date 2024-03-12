import React from "react";
import CommonTabComponent from "../shared/common_tab";
import ToggleButtonComponent from "../shared/toggle_button";
import CardComponent from "../shared/card";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ApiCallComponent from "../apiService/common";
import PieChartComponent from "../chart/pie_chart";
import DountChartComponent from "../chart/dount_chart";
import LineChartComponent from "../chart/line_chart";
import StackBarChartComponent from "../chart/stacked_chart";
import GroupBarChartComponent from "../chart/group_bar_chart";
import BarChartComponent from "../chart/bar_chart";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import  WordMapComponent  from "../shared/world_map";
import CommonFilter from "../shared/common_filter";
// import { LoginSocialGoogle } from "reactjs-social-login";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DashboardComponent = ({ dashboardName }) => {
    const [dashboardConfig, setDashboardConfig] = React.useState(null);
    const [dashboardConfigChild, setDashboardConfigChild] = React.useState(null);
    const [dashboardConfigSubChild, setDashboardConfigSubChild] = React.useState(null);
    const [route, setRoute] = React.useState('programview/impact-summary/card');
    const [tabIndex, setTabIndex] = React.useState(0)
    console.log("dashboardName", dashboardName)
    React.useEffect(() => {
        const fetchDashboardConfig = async () => {
            try {
                const response = await import('../../assets/dashboad/dashboard_toggle_button.json');
                setDashboardConfig(response.tabs);
                setDashboardConfigChild(response.tabs[0].child);
                setDashboardConfigSubChild(response.tabs[1].child);
                console.log("dashboardConfig", dashboardConfig)
                setRoute('programview/impact-summary/card');

            }
            catch (error) {
                console.error('Error loading dashboard configuration:', error);

            }
        }
        fetchDashboardConfig();
    });

    if (!dashboardConfig) {
        return <div>Loading...</div>;
    }

    const recievedDataFromChild = (e) => {
        console.log("child se this method is callig", e)
        let index = e.findIndex((el) => el?.isChecked);
        setTabIndex(index)
    }
    // const [filteredData, setFilteredData] = React.useState(null);
    const fields = [
        // { name: 'country', label: 'Country', type: 'select', options: [], placeholder: 'Select Your Country' },
        { name: 'country', label: 'Country', type: 'multiSelect', options: [], placeholder: 'Enter Your Country' },
        // { name: 'category', label: 'Category', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'date',placeholder:'Select Start Date' },
        // Add more fields as needed
    ];
    const handleFilterChange = (filters) => {
        // Handle the filtered data based on the filters received from CommonFilter
        console.log('Filtered Data:', filters);
        // Implement logic to update or fetch data based on filters
        // setFilteredData(filteredData);
    };

    return (
        <>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{margin:'0px 10px'}}>
               <ToggleButtonComponent tabName={dashboardConfig} childToParentSendDataMethod={(e) => recievedDataFromChild(e)}></ToggleButtonComponent>
            </div>
            <div style={{margin:'0px 10px'}}>
            <CommonFilter fields={fields} onFilterChange={handleFilterChange} filterTitle='Country'></CommonFilter>
            </div>
        </div>

        <div>
           <CommonTabComponent childTabName={dashboardConfigChild}></CommonTabComponent>
        </div>
            

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <WordMapComponent></WordMapComponent>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            {dashboardConfig[tabIndex]?.child.map((el, index) =>
                                <div key={index}>
                                    {
                                        el?.endPointList?.map((e, innerIndex) =>
                                            <div key={innerIndex}>
                                                <ApiCallComponent endpoint={ e == 'country' ? 'country/list' : (el?.endPoint + e) } render={({ data, loading, error }) => (
                                                    <div>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error: {error.message}</p>}
                                                        {data && (
                                                            <>
                                                                { e === 'card' && (<CardComponent cardResponse={data}></CardComponent>)}
                                                                {
                                                                    e === 'country' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                        fields.forEach((el) => {
                                                                            if (el.name === 'country') {
                                                                                  data.data.forEach((item,index) => {
                                                                                    el.options[index] = item
                                                                                  });
                                                                            }
                                                                        })
                                                                    )
                                                                }

                                                            </>
                                                        )}
                                                    </div>
                                                )} />
                                            </div>
                                        )
                                    }
                                </div>
                            )}

                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {dashboardConfig[tabIndex]?.child.map((el, index) =>
                        <Grid item sm={6} md={6} key={index}>
                            <Item>
                                {
                                    el?.endPointList?.map((e, innerIndex) =>
                                        <div key={innerIndex}>
                                            <ApiCallComponent endpoint={e == 'country' ? 'country/list' : (el?.endPoint + e)} render={({ data, loading, error }) => (
                                                <div>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error: {error.message}</p>}
                                                    {data && (
                                                        <>
                                                            {
                                                                e === 'pie-chart' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                    JSON.parse(JSON.stringify(data?.data))?.map((_pieData, pieIndex) => (
                                                                        <div key={pieIndex}>
                                                                            <div className="row">
                                                                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                                                                    <Stack direction="row">
                                                                                        <Avatar alt="Remy Sharp" src={_pieData?.indicator_icons} />
                                                                                        <strong>{_pieData?.name}</strong>
                                                                                    </Stack>
                                                                                </Typography>
                                                                            </div>
                                                                            <PieChartComponent pieResponse={_pieData?.short_key}></PieChartComponent>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }
                                                            
                                                            {
                                                                e === 'group-bar-chart' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                    JSON.parse(JSON.stringify(data?.data))?.map((_groupBarData, groupBarIndex) => (
                                                                        <div key={groupBarIndex}>
                                                                            <div className="row">
                                                                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                                                                    <Stack direction="row">
                                                                                        <Avatar alt="Remy Sharp" src={_groupBarData?.indicator_icons} />
                                                                                        <strong>{_groupBarData?.name}</strong>
                                                                                    </Stack>
                                                                                </Typography>
                                                                            </div>
                                                                            <GroupBarChartComponent groupBarChartResponse={_groupBarData?.details}></GroupBarChartComponent>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }

                                                             {
                                                                e === 'stacked-bar-chart' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                    JSON.parse(JSON.stringify(data?.data))?.map((_stackedBarData, stackedBarIndex) => (
                                                                        <div key={stackedBarIndex}>
                                                                            <div className="row">
                                                                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                                                                    <Stack direction="row">
                                                                                        <Avatar alt="Remy Sharp" src={_stackedBarData?.indicator_icons} />
                                                                                        <strong>{_stackedBarData?.name}</strong>
                                                                                    </Stack>
                                                                                </Typography>
                                                                            </div>
                                                                            <StackBarChartComponent stackedBarChartResponse={_stackedBarData?.details}></StackBarChartComponent>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }

                                                            {
                                                                e === 'donut-chart' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                    JSON.parse(JSON.stringify(data?.data))?.map((_donutChartData, donutChartIndex) => (
                                                                        <div key={donutChartIndex}>
                                                                            <div className="row">
                                                                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                                                                    <Stack direction="row">
                                                                                        <Avatar alt="Remy Sharp" src={_donutChartData?.indicator_icons} />
                                                                                        <strong>{_donutChartData?.name}</strong>
                                                                                    </Stack>
                                                                                </Typography>
                                                                            </div>
                                                                            <DountChartComponent donutChartResponse={_donutChartData?.short_key}></DountChartComponent>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }

{
                                                                e === 'timeline' && Array.isArray(data?.data) && data?.data.length > 0 && (
                                                                    JSON.parse(JSON.stringify(data?.data))?.map((_timelineData, timelineIndex) => (
                                                                        <div key={timelineIndex}>
                                                                            <div className="row">
                                                                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                                                                    <Stack direction="row">
                                                                                        <Avatar alt="Remy Sharp" src={_timelineData?.indicator_icons} />
                                                                                        <strong>{_timelineData?.name}</strong>
                                                                                    </Stack>
                                                                                </Typography>
                                                                            </div>
                                                                            <LineChartComponent timelineResponse={_timelineData?.short_key}></LineChartComponent>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }

                                                        </>

                                                    )}
                                                </div>
                                            )} />
                                        </div>
                                    )
                                }
                            </Item>
                        </Grid>
                    )}
                </Grid>
            </Box>

        </>
    )
}

export default DashboardComponent;