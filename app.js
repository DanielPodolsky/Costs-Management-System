let currentId = -1; // Used for database's ID.
const mainForm = document.getElementById('costEntryForm');
mainForm.addEventListener('submit', async (event) => {
    // Prevent the form from submitting the traditional way
    // This stops the page from refreshing
    event.preventDefault();

    // Now we will get all the values:
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Log the values to make sure we're getting them correctly
/*     console.log('Amount:', amount);
    console.log('Category:', category);
    console.log('Description:', description);
    console.log('date:', date);
    console.log('paymentMethod:', paymentMethod); */

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