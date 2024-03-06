import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const fixedColors = ['#2EB2AA','#458AAD','#BE7FDB','#58B22E','#DB8A7F','#66BEFE','#FED766','#6DBC48','#7F85DB','#FE66C1'];

export default function LineChartComponent(props) {
  let {timelineResponse} = props;
  const customizedData = [];
  const labelObj = {};
  
  timelineResponse?.forEach((el, index) => {
    let obj ={}
    // let color = fixedColors[index];
    // let obj = {
    //   backgroundColor: color,
    //   borderColor: color,
    //   barThickness: 60,
    //   maxBarThickness: 75,
    // };
    obj['curve'] = "linear"
    obj["label"] = el.question_label || el.name;
    let values = el.values.sort((a, b) => a.financial_year - b.financial_year);
    obj["data"] = values.map((item) => {
      labelObj[item.financial_year] = 1;
      return item.total_count;
    });
    customizedData.push(obj);
  });
  
  const customLabel = Object.keys(labelObj).sort((a, b) => Number(a) - Number(b));
  
 
  
  console.log("timelineResponse",customizedData)
  return (
    <div>
        <div>
        <LineChart
    series={customizedData.map((el) => ({
      curve: el?.curve,
      data: el?.data,
    }))}
    height={400}
      margin={{ top: 10, bottom: 20 }}
  />
        </div>
    </div>
  );
}