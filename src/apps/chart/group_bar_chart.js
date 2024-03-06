import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const sizing = {
    width: 900,
    height: 400,
    legend: { 
      hidden: false ,
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
  },
  };

export default function GroupBarChartComponent(props) {
  let {groupBarChartResponse} = props;
  console.log("groupBarChartResponse",groupBarChartResponse)
  const customizedData = [];
  const labelObj = [];
  
  groupBarChartResponse?.forEach((el, index) => {
    let obj ={}
    obj['scaleType'] = "band"
    obj["label"] = el.question_label || el.name;
    let values = el.values.sort((a, b) => a.financial_year - b.financial_year);
    obj["data"] = values.map((item) => {
      labelObj[item.financial_year] = 1;
      return item.total_count;
    });
    customizedData.push(obj);
  });
  
  const customLabel = Object.keys(labelObj).sort((a, b) => Number(a) - Number(b));
  
 console.log("mappedData",customizedData)
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: customLabel }]}
      series={customizedData.map((el) => ({
        data: el?.data,
      }))}
      {...sizing}
    />
  );
}