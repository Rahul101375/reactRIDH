import * as React from 'react';
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data1 = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
];
let data = []


const size = {
    width: 400,
    height: 400,
    legend: { 
        hidden: false ,
        direction: 'row',
        position: { vertical: 'bottom', horizontal: 'middle' },
    },
};
const getArcLabel = (params) => {
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%(${params?.value})`;
  };

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontWeight:'bold'
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}


export default function DountChartComponent(props) {
    let {donutChartResponse} = props;
    data = donutChartResponse.map((el)=>{
        if(el?.hasOwnProperty('question_label')){
          el.label = el?.question_label;
        }
        if(el?.hasOwnProperty('total_count')){
          el.value = el?.total_count;
        }
        return el
      })
    console.log("donutChartResponse",donutChartResponse)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <PieChart series={[
                    { 
                    data, 
                    innerRadius: 80 ,
                    arcLabel: getArcLabel
                    }
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'white',
                      fontSize: 10,
                      fontWeight:'bold'
                    },
                  }}
                     {...size}>
                    <PieCenterLabel> Total : { data.map((item) => item.value).reduce((a, b) => a + b, 0)}</PieCenterLabel>
                </PieChart>
            </div>
        </div>
    );
}