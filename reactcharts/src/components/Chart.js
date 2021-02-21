import React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";

function Chart(props) {
  const defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  return (
    <div className="chart">
      <Bar
        data={props.data}
        options={{
          title: {
            display: defaultProps.displayTitle,
            text: "Largest Cities In " + props.location,
            fontSize: 25,
          },
          legend: {
            display: defaultProps.displayLegend,
            position: defaultProps.legendPosition,
          },
        }}
      />
      <Line
        data={props.data}
        options={{
          title: {
            display: defaultProps.displayTitle,
            text: "Largest Cities In " + props.location,
            fontSize: 25,
          },
          legend: {
            display: defaultProps.displayLegend,
            position: defaultProps.legendPosition,
          },
        }}
      />
      <Pie
        data={props.data}
        options={{
          title: {
            display: defaultProps.displayTitle,
            text: "Largest Cities In " + props.location,
            fontSize: 25,
          },
          legend: {
            display: defaultProps.displayLegend,
            position: defaultProps.legendPosition,
          },
        }}
      />
    </div>
  );
}

export default Chart;
