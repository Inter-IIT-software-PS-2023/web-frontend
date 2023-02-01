import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Progress } from '@ant-design/plots';

const ProgressChart = () => {
    const config = {
        height: 40,
        width: 300,
        autoFit: false,
        percent: 0.536,
        barWidthRatio: 0.3,
        color: ['#F4664A', '#E8EDF3'],
    };
    return <Progress {...config} />;
};

export default ProgressChart;
