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
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { 
  ShoppingCart,  // for groceries
  Power,         // for utilities
  DirectionsCar, // for transportation
  Theaters,      // for entertainment
  LocalHospital, // for healthcare
  School,         // for education
  Payments,      // for the default/select option
  Money,         // for cash
  CreditCard,    // for credit card
  PaymentsTwoTone, // for debit card
  AccountBalance  // for bank transfer
} from '@mui/icons-material';
import { Category } from '@mui/icons-material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import rightArrow from '../../assets/right-arrow.png';

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
    <section id="addCostSection" style={{ position: 'relative', minHeight: '100px' }}>
      <Box className="description-helper" style={{ 
        position: 'absolute', 
        display: 'flex', 
        alignItems: 'center',
        height: '100%',         // This gives the flex container a height
        width: '33%',
        flexDirection: 'column',
        gap: '15px',
      }}>
        <h2>Track Your Expenses with Ease</h2>
        <p>
          Welcome to your personal expense tracker! Add your daily expenses in just a few clicks. Simply enter the amount, choose a category, and provide a brief description. Whether it's your morning coffee or monthly bills, organizing your finances has never been simpler.
        </p>
        <p>
          To get started:
          <br></br>
          1. Enter the expense amount
          <br></br>
          2. Select a spending category
          <br></br>
          3. Add a short description to help you remember
          <br></br>
          4. Pick the date of the transaction
          <br></br>
          5. Choose your payment method
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
          alignItems: 'center',
          '& .MuiFormControl-root': { 
            width: '400px'  // Fixed width for all form controls
          },
          '& .MuiTextField-root': {
            width: '400px'  // Same width for TextFields
          },
          '& .MuiBox-root': {
            width: '400px'  // Same width for nested Box components
          },
          '& .MuiInputLabel-root': {  // Will style all input labels
            fontWeight: 700,
            fontFamily: 'Oswald, serif',
            fontOpticalSizing: 'auto'
          },
        }}
      >

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachMoneyRoundedIcon sx={{ color: 'action.active', ml: 1, mr: 1, my: 0.5 }} />
          <TextField id="amount" label="Amount" variant="filled" type="number" required onChange={handleInputChange} name="amount" value={formData.amount}/>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Category sx={{ color: 'action.active', ml: 1, mr: 1, my: 0.5 }} />
          <FormControl required>
          <InputLabel>Category</InputLabel>
          <Select
            id="category"
            label="Category"
            onChange={handleInputChange}
            name="category"
            value={formData.category}
            variant="filled"
          >
            <MenuItem value=""><em>Select a category</em></MenuItem>
            <MenuItem value="groceries">
              <ShoppingCart sx={{ mr: 1 }} /> Groceries
            </MenuItem>
            <MenuItem value="utilities">
              <Power sx={{ mr: 1 }} /> Utilities
            </MenuItem>
            <MenuItem value="transportation">
              <DirectionsCar sx={{ mr: 1 }} /> Transportation
            </MenuItem>
            <MenuItem value="entertainment">
              <Theaters sx={{ mr: 1 }} /> Entertainment
            </MenuItem>
            <MenuItem value="healthcare">
              <LocalHospital sx={{ mr: 1 }} /> Healthcare
            </MenuItem>
            <MenuItem value="education">
              <School sx={{ mr: 1 }} /> Education
            </MenuItem>
          </Select>
        </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CreateRoundedIcon sx={{ color: 'action.active', ml: 1, mr: 1, my: 0.5 }} />
          <TextField id="description" label="Description" multiline required onChange={handleInputChange} name="description" value={formData.description} variant="filled"/>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EventAvailableRoundedIcon sx={{ color: 'action.active', ml: 1, mr: 1, my: 0.5 }} />
          <TextField id="date" type="date" required onChange={handleInputChange} name="date" value={formData.date} variant="filled"/>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AddCardRoundedIcon sx={{ color: 'action.active', ml: 1, mr: 1, my: 0.5 }} />
          <FormControl required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            id="payment-method"
            label="Payment Method"
            onChange={handleInputChange}
            name="paymentMethod"
            value={formData.paymentMethod}
            variant="filled"
          >
            <MenuItem value="">
              <Payments sx={{ mr: 1 }} /> Select payment method
            </MenuItem>
            <MenuItem value="cash">
              <Money sx={{ mr: 1 }} /> Cash
            </MenuItem>
            <MenuItem value="credit">
              <CreditCard sx={{ mr: 1 }} /> Credit Card
            </MenuItem>
            <MenuItem value="debit">
              <PaymentsTwoTone sx={{ mr: 1 }} /> Debit Card
            </MenuItem>
            <MenuItem value="transfer">
              <AccountBalance sx={{ mr: 1 }} /> Bank Transfer
            </MenuItem>
          </Select>
        </FormControl>
        </Box>

        <Button type="submit" variant="contained" color="success" endIcon={<EmojiEmotionsIcon/>}>
          Add Cost
        </Button>
      </Box>
    </section>
  );
}

export default AddCostSection;
