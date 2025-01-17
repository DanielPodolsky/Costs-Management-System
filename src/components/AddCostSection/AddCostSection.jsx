import "./AddCostSection.css";
import { useState } from "react";
import { dbService } from "../../scripts/database.js";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import dayjs from "dayjs"; // Import dayjs for date handling

function AddCostSection() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: null, // Initialize with null for dayjs compatibility
    paymentMethod: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent the browser from refreshing as it is the default behavior.

    try {
      await dbService.addCost(formData); // formData should be with information because each input has onChange attribute.
      //! After adding the cost, reset the form.
      setFormData({
        amount: "",
        category: "",
        description: "",
        date: null, // Reset date to null
        paymentMethod: "",
      });
      alert("Cost added successfully!");
    } catch (error) {
      console.error("Error adding cost:", error);
      alert("Failed to add cost. Please try again.");
    }
  };

  //! Detects change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //! Detects change for DatePicker
  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      date: newValue ? dayjs(newValue).format("MM-YYYY") : null, // Set to dayjs object or null
    }));
  };

  return (
    <section id="addCostSection">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiFormControl-root": { mb: 2, width: "100%" },
        }}
      >
        <TextField
          label="Amount"
          type="number"
          required
          onChange={handleInputChange}
          name="amount"
          value={formData.amount}
        />

        <FormControl required>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            onChange={handleInputChange}
            name="category"
            value={formData.category}
          >
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
          onChange={handleInputChange}
          name="description"
          value={formData.description}
        />

        <TextField
          label="Date"
          type="date"
          required
          onChange={handleInputChange}
          name="date"
          value={formData.date}
        />

        <FormControl required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            label="Payment Method"
            onChange={handleInputChange}
            name="paymentMethod"
            value={formData.paymentMethod}
          >
            <MenuItem value="">Select payment method</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit Card</MenuItem>
            <MenuItem value="debit">Debit Card</MenuItem>
            <MenuItem value="transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Cost
        </Button>
      </Box>
    </section>
  );
}

export default AddCostSection;
