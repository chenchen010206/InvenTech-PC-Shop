document.addEventListener('DOMContentLoaded', function () {
    // Fetch the XML file
    fetch('products.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');

            // Get all products from XML
            const products = xmlDoc.getElementsByTagName('product');
            const productContainer = document.getElementById('product-container');
            const categoryFilter = document.getElementById('category-filter');

            // Function to display products
            function displayProducts(filteredProducts) {
                productContainer.innerHTML = ''; // Clear the container before appending new products

                filteredProducts.forEach(product => {
                    const name = product.getElementsByTagName('name')[0].textContent;
                    const category = product.getElementsByTagName('category')[0].textContent;
                    const image = product.getElementsByTagName('image')[0].textContent;
                    const price = product.getElementsByTagName('price')[0].textContent;
                    const stock = product.getElementsByTagName('stock')[0].textContent;

                    let specsHtml = '';
                    const specs = product.querySelector('specs');
                    if (specs) {
                        const specsList = Array.from(specs.children).map(spec =>
                            `<li><span class="label">${spec.tagName}:</span> ${spec.textContent}</li>`
                        ).join('');
                        specsHtml = `
                            <div class="specs">
                                <ul>${specsList}</ul>
                            </div>
                        `;
                    }

                    // Create product card element
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    
                    productCard.innerHTML = `
                        <img src="${image}" alt="${name}">
                        <h3 class="product-name">${name}</h3>
                        <p>Category: ${category}</p>
                        ${specsHtml}
                        <p>Price: ${price}</p>
                        <p><strong>Stock:</strong><span class="stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}">
                            ${stock > 0 ? stock : 'Out of Stock'}
                        </span></p>
                    `;

                    productContainer.appendChild(productCard);
                });
            }

            // Display all products initially
            displayProducts(Array.from(products));

            // Filter products by category
            categoryFilter.addEventListener('change', function (event) {
                const selectedCategory = event.target.value;
                const filteredProducts = Array.from(products).filter(product => {
                    const productCategory = product.getElementsByTagName('category')[0].textContent;
                    return selectedCategory === 'all' || selectedCategory === productCategory;
                });

                displayProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error loading XML:', error));
});


function switchTheme() {
    const themeLink = document.getElementById("theme-style");
    const currentHref = themeLink.getAttribute("href");

    const newTheme = currentHref.includes("style1.css") ? "css/style2.css" : "css/style1.css";

    themeLink.setAttribute("href", newTheme);
    localStorage.setItem("theme", newTheme);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme");
    const themeLink = document.getElementById("theme-style");

    if (savedTheme && themeLink) {
        themeLink.setAttribute("href", savedTheme);
    }
});