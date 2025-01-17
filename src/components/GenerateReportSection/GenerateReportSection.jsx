import './GenerateReportSection.css'
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { dbService } from '../../scripts/database.js';
import { Button } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';

function GenerateReportSection() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateString = e.target.monthPicker.value;
        const [year, month] = dateString.split('-');
        await updateChart(parseInt(month) - 1, parseInt(year));
    };

    const updateChart = async (month, year) => {
        try {
            const categoryTotals = await dbService.getCostsByTime(month, year);
            
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(categoryTotals),
                    datasets: [{
                        data: Object.values(categoryTotals),
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56',
                            '#4BC0C0', '#9966FF', '#FF9F40'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#ffffff' }
                        },
                        title: {
                            display: true,
                            text: `Expenses by Category - ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`,
                            color: '#ffffff'
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating pie chart:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <section>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label htmlFor="monthPicker">Select Month and Year:</label>
                        <input 
                            type="month" 
                            id="monthPicker" 
                            name="monthPicker" 
                            required 
                        />
                        <Button startIcon={<SummarizeIcon/>}
                            type="submit"
                            variant='contained'
                            color='primary'
                        >
                            Generate me a report!
                        </Button>
                    </div>
                </form>
                <div className="chart-container">
                    <canvas ref={chartRef} />
                </div>
            </section>
        </>
    );
}

export default GenerateReportSection;