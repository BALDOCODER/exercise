// This is your coding exercise! Please implement the following functionality:

class ProductManager {
    constructor() {
        // TODO: Initialize necessary properties
        // Hint: You will need to store products and track categories
    }

    async addProduct(product) {
        // TODO: Implement product addition
        // Requirements:
        // 1. Validate product data (name, price, category)
        // 2. Generate unique ID
        // 3. Add timestamp
        // 4. Simulate API call with setTimeout
        // 5. Update categories list
        // Throw errors for invalid data
    }

    async deleteProduct(productId) {
        // TODO: Implement product deletion
        // Requirements:
        // 1. Find product by ID
        // 2. Remove from products array
        // 3. Update categories if needed
        // 4. Simulate API call
    }

    filterProducts(searchTerm, category) {
        // TODO: Implement filtering logic
        // Requirements:
        // 1. Filter by search term (product name)
        // 2. Filter by category if specified
        // 3. Return filtered array
    }

    sortProductsByPrice(ascending = true) {
        // TODO: Implement sorting logic
        // Requirements:
        // 1. Sort products by price
        // 2. Handle ascending and descending order
    }

    getCategories() {
        // TODO: Return unique categories
    }
}

// DOM Manipulation
document.addEventListener("DOMContentLoaded", () => {
    const productManager = new ProductManager();
    
    // TODO: Implement event listeners and DOM manipulation
    // Requirements:
    // 1. Handle form submission
    // 2. Implement search functionality
    // 3. Implement category filtering
    // 4. Implement price sorting
    // 5. Display products in the DOM
    // 6. Handle error displays
    // 7. Implement delete functionality for each product
});

// Bonus challenges:
// 1. Implement data persistence using localStorage
// 2. Add edit functionality for products
// 3. Add input validation with meaningful error messages
// 4. Implement undo/redo functionality
// 5. Add sorting by different fields (name, date added)
