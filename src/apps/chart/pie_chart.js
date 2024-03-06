import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

let data1 = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
];
 let data = [];

const sizing = {
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

export default function PieChartComponent(props) {
    let {pieResponse} = props
    console.log("pieResponse",pieResponse)
    data = pieResponse.map((el)=>{
      if(el?.hasOwnProperty('question_label')){
        el.label = el?.question_label;
      }
      if(el?.hasOwnProperty('total_count')){
        el.value = el?.total_count;
      }
      return el
    })
    
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
      <PieChart
      margin={{ top: 100, bottom: 100, left: 100, right:100 }}
      series={[
        {
          outerRadius: 140,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 10,
          fontWeight:'bold'
        },
      }}
      {...sizing}
    />
      </div>
   </div>
  );
}