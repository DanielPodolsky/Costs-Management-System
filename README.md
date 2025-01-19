# Cost Management System 💰

A user-friendly React application designed to help clients track and visualize their expenses efficiently. This system provides an intuitive interface for recording expenses and generating insightful spending reports.

Visit the site: https://danielpodolsky.github.io/Costs-Management-System/#
## Key Features

### 1. Expense Recording
- **Form Interface**: Add expenses with a comprehensive form including:
  - Amount tracking
  - Categorized spending
  - Detailed descriptions
  - Date selection
  - Multiple payment methods
- **User Guidance**: Helpful instructions and visual cues guide users through the process
- **Real-time Validation**: Ensures accurate data entry

### 2. Visual Reporting
- **Interactive Charts**: Generate pie charts for selected time periods
- **Time-based Analysis**: Filter reports by month and year
- **Category Breakdown**: Visual representation of spending distribution
- **Intuitive Visualization**: Color-coded categories for easy understanding

## Technical Details

### Built With
- React.js
- Material-UI (MUI) Components
- CSS Flexbox layouts
- IndexedDB for client-side data storage

### Database
The application uses IndexedDB, a low-level client-side storage system that enables persistent data storage in the browser. This choice provides:
- Offline functionality
- Fast data retrieval and storage
- Ability to store significant amounts of data locally

### Component Overview

#### AddSection Component
The expense recording interface featuring:
- Form validation
- Icon integration
- Helper text panel
- Step-by-step guidance

![image](https://github.com/user-attachments/assets/dc58e539-2bf3-49f9-848a-09230ad718f9)

#### GenerateReport Component
The reporting interface including:
- Month/Year selection
- Dynamic pie chart generation
- Category distribution display

![image](https://github.com/user-attachments/assets/8b5fce61-9fec-4714-951c-cca52b01f166)

## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/DanielPodolsky/Costs-Management-System.git
```

2. Install dependencies
```bash
cd Costs-Management-System
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```
Note: This project uses several Material-UI (MUI) components. The above command will install:

- Core MUI components (@mui/material)
- Required emotion dependencies for styling
- MUI icons package (@mui/icons-material)

3. Start the development server
```bash
npm run dev
```

## Usage Guide

### Adding Expenses
1. Navigate to the Add Cost section
2. Fill in the required fields:
   - Enter the expense amount
   - Select the appropriate category
   - Add a description
   - Choose the date
   - Select payment method
3. Submit the form

### Generating Reports
1. Go to the Generate Report section
2. Select desired month and year
3. View the generated pie chart showing expense distribution
4. Analyze spending patterns by category

## Future Enhancements

User Experience:
   - Dark mode
   - Mobile optimization

## License

MIT License

Copyright (c) 2024 Daniel Podolsky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
