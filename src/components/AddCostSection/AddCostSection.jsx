import './AddCostSection.css'
import { useState } from 'react';
import { dbService } from '../../scripts/database.js';
import { TextField, Select, MenuItem, Button, Box, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddCostSection() {

    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: '',
        paymentMethod: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // To prevent the browser from refreshing as it is the default behavior.

        try {
            await dbService.addCost(formData); // formData should be with information because each input has onChange attribute.
            //! After adding the cost, reset the form.
            setFormData({
                amount: '',
                category: '',
                description: '',
                date: '',
                paymentMethod: ''
            });
            alert('Cost added successfully!');
        } catch (error) {
            console.error('Error adding cost:', error);
            alert('Failed to add cost. Please try again.');
        }
    }


    //! Detects change in whatever input tag and updates the formData.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return (
        <>
            <section id="addCostSection">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiFormControl-root': { mb: 2, width: '100%' }
                    }}
                >
                    <TextField
                        label="Amount"
                        type="number"
                        required
                        onChange={handleChange}
                        name="amount"
                        value={formData.amount}
                    />

                    <FormControl required>
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" onChange={handleChange} name="category" value={formData.category}>
                            <MenuItem value="">Select a category</MenuItem>
                            <MenuItem value="groceries">Groceries</MenuItem>
                            <MenuItem value="utilities">Utilities</MenuItem>
                            <MenuItem value="transportation">Transportation</MenuItem>
                            <MenuItem value="entertainment">Entertainment</MenuItem>
                            <MenuItem value="healthcare">Healthcare</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        required
                        onChange={handleChange}
                        name="description"
                        value={formData.description}
                    />


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date *" />
                    </LocalizationProvider>
                    
                    <FormControl required>
                        <InputLabel>Payment Method</InputLabel>
                        <Select label="Payment Method" onChange={handleChange} name="paymentMethod" value={formData.paymentMethod}>
                            <MenuItem value="">Select payment method</MenuItem>
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="credit">Credit Card</MenuItem>
                            <MenuItem value="debit">Debit Card</MenuItem>
                            <MenuItem value="transfer">Bank Transfer</MenuItem>
                        </Select>
                    </FormControl>

                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Add Cost
                    </Button>
                </Box>
            </section>
        </>
    )
}

export default AddCostSection;