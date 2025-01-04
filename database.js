// It's gonna try all these different API's depending on the browser you're using and it'll grab the first one it uses.
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// It's gonna make a request to open indexedDB and open up a database.
// The string is the name of the database. If it doesn't find it it's gonna create it.
// The number is the version number of the database.
const request = indexedDB.open("CostsManagement", 1);

// Even there's some kind of an error opening the database, we need to let the user know.
request.onerror = function(event) {
    console.error("An error occurred with indexedDB");
    console.error(event);
};

// A function that gets run whenever a NEW database is created OR an existing database's version number has changed.
request.onupgradeneeded = function() {
    const db = request.result; // Reference to the result -> Cars Database
    const store = db.createObjectStore("costs", { keyPath: "id"}); // We're going to store our costs here, keyPath is the primary key (ID, it's unique).
    /* store.createIndex("cars_colour", ["colour"], { unique: false }); // Index on the colour of the car, so we can look up cars by their colours.
    store.createIndex("colour_and_make", ["colour", "make"], { unique: false }); // Compound index = Combination of more than one keys to make up a new index. (Both the colour and the maker of the vehicle; search for all the red mazdas for example) */

    // We will create indexes later on when we will want to create queries and such.
    // For now (16.12) we are working on the add button only.
    // This means that only the store is important to us now.
};



request.onsuccess = function() {
    const db = request.result;
    console.log('Database successfully opened!');

    window.addCost = async function(costData) {
        // Return a Promise so we know when the operation is complete
        return new Promise((resolve, reject) => {
            // Check if we have a database connection
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }
    
            try {
                const transaction = db.transaction(['costs'], 'readwrite');
                
                const store = transaction.objectStore('costs');
    
                // Add the data to the store
                const request = store.add(costData);
    
                // Handle the success case
                request.onsuccess = () => {
                    console.log('Cost added successfully');
                    resolve(costData);
                };
    
                // Handle any errors
                request.onerror = () => {
                    reject(request.error);
                };
    
            } catch (error) {
                reject(error);
            }
        });
    }


    // In database.js
    window.getCostsByTime = async function(month, year) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            try {
                const transaction = db.transaction(['costs'], 'readonly');
                const store = transaction.objectStore('costs');
                const categoryTotals = {};

                // Get all costs and filter them by month and year
                const request = store.openCursor();
                
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const cost = cursor.value;
                        const costDate = new Date(cost.date);
                        
                        // Check if this cost belongs to our selected month and year
                        if (costDate.getMonth() == month && 
                            costDate.getFullYear() == year) {
                            // Add to category total
                            if (!categoryTotals[cost.category]) {
                                categoryTotals[cost.category] = 0;
                            }
                            categoryTotals[cost.category] += Number(cost.amount);
                        }
                        cursor.continue();
                    } else {
                        resolve(categoryTotals);
                    }
                };

                request.onerror = () => {
                    reject(request.error);
                };

            } catch (error) {
                reject(error);
            }
        });
    };
}

