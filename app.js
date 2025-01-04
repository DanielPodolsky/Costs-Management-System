// -------------------------------------- Add Cost --------------------------------------

let currentId = -1; // Used for database's ID.
const mainForm = document.getElementById('costEntryForm');
mainForm.addEventListener('submit', async event => {
    // Prevent the form from submitting the traditional way
    // This stops the page from refreshing
    event.preventDefault();

    // Now we will get all the values:
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Make an object from these data
    const data = {
        id: ++currentId, 
        amount: amount,
        category: category, 
        description: description,
        date: date,
        paymentMethod: paymentMethod
    }

    try {
        // Call our addCost function that we created in the database
        await addCost(data);
        
        // If successful, clear the form
        mainForm.reset();
        
        // Optional: Show a success message to the user
        alert('Cost added successfully!');
        
    } catch (error) {
        // If something goes wrong, tell the user
        console.error('Error adding cost:', error);
        alert('Failed to add cost. Please try again.');
    }

});


// -------------------------------------- Generate Report --------------------------------------

const addCostSection = document.getElementById('addCostSection');
const generateReportSection = document.getElementById('generateReportSection');
const navBarLinks = document.querySelector('.nav-links');
const generateReportNav = document.getElementById('generateReportLink');
const addCostNav = document.getElementById('addCostLink');
const reportForm = document.getElementById('reportForm');


navBarLinks.addEventListener('click', event => {
    // First, prevent the default link behavior
    event.preventDefault();

    // The event.target tells us exactly what was clicked
    const clickedElement = event.target;


    // Check if we clicked a navigation link and not empty space
    if (!clickedElement.classList.contains('nav-link')) {
        return; // Exit early if we didn't click a nav link
    }

    // Remove active class from all navigation links first
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked link
    clickedElement.classList.add('active');

    // Handle showing/hiding appropriate sections
    if (clickedElement.id === 'addCostLink') {
        addCostSection.style.display = 'block';
        generateReportSection.style.display = 'none';
    } else if (clickedElement.id === 'generateReportLink') {
        addCostSection.style.display = 'none';
        generateReportSection.style.display = 'block';
    }
});

reportForm.addEventListener('submit', async event => {
    event.preventDefault();
    
    // Get the value from the month input (e.g., "2025-01")
    const dateString = document.getElementById('monthPicker').value;
    
    // Split the string into year and month
    // The split creates an array like ["2025", "01"]
    const [year, monthStr] = dateString.split('-');
    
    // Convert to numbers and adjust month to 0-11 range
    // We subtract 1 from the month because JavaScript months are 0-based
    // (January is 0, February is 1, etc.)
    const yearParsed = parseInt(year);
    const monthParsed = parseInt(monthStr) - 1;
    
    await updatePieChart(monthParsed, yearParsed);
})

// In app.js
async function updatePieChart(month, year) {
    try {
        // Get our category totals from the database
        const categoryTotals = await getCostsByTime(month, year);
        
        // Prepare data for the chart
        const data = {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384',  // Red
                    '#36A2EB',  // Blue
                    '#FFCE56',  // Yellow
                    '#4BC0C0',  // Teal
                    '#9966FF',  // Purple
                    '#FF9F40'   // Orange
                ]
            }]
        };

        // Get the canvas context
        const ctx = document.getElementById('costChart').getContext('2d');
        
        // Check if there's an existing chart in a safer way
        if (window.costChart instanceof Chart) {
            window.costChart.destroy();
        }

        // Create new chart
        window.costChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#ffffff'  // For dark theme
                        }
                    },
                    title: {
                        display: true,
                        text: `Expenses by Category - ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`,
                        color: '#ffffff'  // For dark theme
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating pie chart:', error);
    }
}