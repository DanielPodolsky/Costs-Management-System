// src/services/DatabaseService.js
class DatabaseService {
    static instance = null;
    db = null;

    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async init() {
        if (this.db) return this.db;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("CostsManagement", 1);
            
            request.onerror = () => reject(request.error);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };
        });
    }

    async addCost(costData) {
        const db = await this.init();
        const transaction = db.transaction(['costs'], 'readwrite');
        const store = transaction.objectStore('costs');
        
        return new Promise((resolve, reject) => {
            const request = store.add(costData);
            request.onsuccess = () => resolve(costData);
            request.onerror = () => reject(request.error);
        });
    }

    async getCostsByTime(month, year) {
        const db = await this.init();
        const transaction = db.transaction(['costs'], 'readonly');
        const store = transaction.objectStore('costs');
        
        return new Promise((resolve, reject) => {
            const categoryTotals = {};
            const request = store.openCursor();
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const cost = cursor.value;
                    const costDate = new Date(cost.date);
                    
                    if (costDate.getMonth() === month && 
                        costDate.getFullYear() === year) {
                        categoryTotals[cost.category] = 
                            (categoryTotals[cost.category] || 0) + Number(cost.amount);
                    }
                    cursor.continue();
                } else {
                    resolve(categoryTotals);
                }
            };
            
            request.onerror = () => reject(request.error);
        });
    }
}

export const dbService = DatabaseService.getInstance();