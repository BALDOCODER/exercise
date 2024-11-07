class ProductManager {
    constructor() {
        this.products = [];
        this.categories = new Set();
    }

    // Adds a product with validation, unique ID, and timestamp
    async addProduct({ name, price, category }) {
        return new Promise((resolve, reject) => {
            // Validate product data
            if (!name || typeof price !== "number" || price <= 0 || !category) {
                reject("Invalid product data");
                return;
            }

            // Generate unique ID and timestamp
            const product = {
                id: Date.now().toString(),
                name,
                price,
                category,
                timestamp: new Date()
            };

            // Simulate API call
            setTimeout(() => {
                this.products.push(product);
                this.categories.add(category);
                resolve(product);
            }, 500);
        });
    }

    // Deletes a product by ID
    async deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            const index = this.products.findIndex(p => p.id === productId);
            if (index === -1) {
                reject("Product not found");
                return;
            }

            // Simulate API call
            setTimeout(() => {
                const deletedProduct = this.products.splice(index, 1)[0];

                // Update categories if needed
                if (!this.products.some(p => p.category === deletedProduct.category)) {
                    this.categories.delete(deletedProduct.category);
                }
                resolve(deletedProduct);
            }, 500);
        });
    }

    // Filters products by search term and category
    filterProducts(searchTerm = "", category = null) {
        return this.products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !category || product.category === category;
            return matchesName && matchesCategory;
        });
    }

    // Sorts products by price in ascending or descending order
    sortProductsByPrice(ascending = true) {
        return this.products.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    }

    // Returns unique categories as an array
    getCategories() {
        return Array.from(this.categories);
    }
}

// DOM Manipulation
document.addEventListener("DOMContentLoaded", () => {
    const productManager = new ProductManager();

    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortButton = document.getElementById("sortButton");

    // Display products
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productItem = document.createElement("li");
            productItem.textContent = `${product.name} - $${product.price} - ${product.category}`;
            productItem.dataset.id = product.id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = async () => {
                await productManager.deleteProduct(product.id);
                displayProducts(productManager.products);
            };

            productItem.appendChild(deleteButton);
            productList.appendChild(productItem);
        });
    }

    // Handle form submission
    productForm.onsubmit = async (event) => {
        event.preventDefault();
        const name = productForm.elements["name"].value;
        const price = parseFloat(productForm.elements["price"].value);
        const category = productForm.elements["category"].value;

        try {
            await productManager.addProduct({ name, price, category });
            displayProducts(productManager.products);
            updateCategoryFilter();
            productForm.reset();
        } catch (error) {
            alert(error);
        }
    };

    // Update category filter dropdown
    function updateCategoryFilter() {
        const categories = productManager.getCategories();
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    // Handle search functionality
    searchInput.oninput = () => {
        const searchTerm = searchInput.value;
        const category = categoryFilter.value;
        const filteredProducts = productManager.filterProducts(searchTerm, category);
        displayProducts(filteredProducts);
    };

    // Handle category filtering
    categoryFilter.onchange = () => {
        const searchTerm = searchInput.value;
        const category = categoryFilter.value;
        const filteredProducts = productManager.filterProducts(searchTerm, category);
        displayProducts(filteredProducts);
    };

    // Handle price sorting
    sortButton.onclick = () => {
        const ascending = sortButton.dataset.ascending === "true";
        const sortedProducts = productManager.sortProductsByPrice(ascending);
        displayProducts(sortedProducts);
        sortButton.dataset.ascending = !ascending;
    };

    // Initial display
    displayProducts(productManager.products);
    updateCategoryFilter();
});
