import * as React from 'react';
import { BarChart, } from '@mui/x-charts/BarChart';

export default function StackBarChartComponent(props) {
  let {stackedBarChartResponse} = props;
  let customizedData = [];
  const firstLetterCaptial =(value)=>{
    if (value) {
      let sentence = value.split("_");
      return sentence
        .map((word) => word.charAt(0)?.toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "";
  }
  console.log("stackedBarChartResponse",stackedBarChartResponse)
  stackedBarChartResponse?.forEach((ele,index) => {
    let labelObj = {};
    let stack = ele.question_label || `stack ${index}`
    let dataArr = ele.short_key || ele.short_key_women || ele.short_key_men;
    let obj = {}
    dataArr.forEach((el,short_key_index) => {
        obj['stack'] = "A";
        obj["label"] =  (el.question_label || el.name) ? firstLetterCaptial(el.question_label || el.name) : "";
        // obj["label"] =  (el.question_label || el.name);
        let values = el.values.sort((a,b) => a.financial_year-b.financial_year);
        obj["data"] = values.map((item) => {
            labelObj[item.financial_year] = 1;
            return item.total_count;
        });

        customizedData.push(obj);
    });
});


console.log("customizedData",customizedData)
 


// let labels = Object.keys(labelObj).sort((a,b) => Number(a)-Number(b));
  return (
    <BarChart
      series={customizedData.map((el) => ({
        stack: el?.stack,
        data: el?.data,
      }))}
      width={900}
      height={400}
    />
  );
}