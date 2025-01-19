import './GenerateReportSection.css'
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { dbService } from '../../scripts/database.js';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    FormControl,
    InputLabel,
} from "@mui/material";
import rightArrow from '../../assets/right-arrow.png';

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
                            position: 'top',
                            labels: { color: '#484646' }
                        },
                        title: {
                            display: true,
                            text: `Expenses by Category - ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`,
                            color: '#484646'
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
            <section style={{ position: 'relative', minHeight: '100px' }}>
                    <Box className="description-helper" style={{ 
                        position: 'absolute', 
                        display: 'flex', 
                        alignItems: 'center',
                        height: '100%',         // This gives the flex container a height
                        width: '33%',
                        flexDirection: 'column',
                        gap: '15px',
                    }}>
                        <h2>Visualize Your Spending</h2>
                        <p>
                            Ready to see where your money goes? Select a month and year to generate a detailed breakdown of your expenses. Our intuitive pie chart visualization makes it easy to understand your spending patterns at a glance.
                        </p>
                        <p>
                            The chart will show you:
                            <br></br>
                            • How much you spent in each category
                            <br></br>
                            • Which areas are taking the biggest slice of your budget
                            <br></br>
                            • Your overall monthly expenditure
                        </p>
                        <p>
                            Make smarter financial decisions by understanding your spending habits! 📊
                        </p>
                        <img src={rightArrow} alt="Right Arrow pointing to the form to fill, to add a new cost" className="rightArrowPic"/>
                    </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '15px',
                        width: '400px'
                        }}
                    >
                        <TextField
                        id="monthPicker"
                        label="Select Month and Year"
                        type="month"
                        required
                        fullWidth
                        variant="filled"  // To match your other inputs
                        sx={{
                            '& .MuiInputLabel-root': {  // This targets the label
                              fontWeight: 400,
                              fontFamily: 'Oswald, serif',
                              fontOpticalSizing: 'auto',
                            }
                          }}
                        />
                        <Button startIcon={<SummarizeIcon/>}
                            type="submit"
                            variant='contained'
                            color='success'
                            sx={{ width: 'auto', alignSelf: 'center' }}
                        >
                            Generate me a report!
                        </Button>


                        <Box 
                            sx={{
                                mt: 2  // margin top
                            }}
                        >
                            <canvas ref={chartRef} className='chart-container' />
                        </Box>
                    </Box>
                </Box>
            </section>
        </>
    );
}

export default GenerateReportSection;