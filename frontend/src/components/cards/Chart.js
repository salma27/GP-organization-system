import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ["Computer Science","Decision Support","information system"],
  datasets: [
    {
      label: '# of Teams',
      data: [20, 15, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => (
  <div className="statNum-board">
    <div className='header'>
      <h2 className='title' style={{color:"black",fontWeight:"700"}}>Vertical Bar Chart</h2>
      <div className='links'>
        
      </div>
    </div>
    <div className="row">
        <div className="col-6 m-auto">
            <Bar data={data} options={options} />
        </div>
    </div>
    
  </div>
);

export default VerticalBar;