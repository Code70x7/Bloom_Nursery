document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Select the button by its ID for 'Shop Now'
    const shopNowButton = document.getElementById('shopNowBtn');

    // Check if the shopNowButton exists
    if (shopNowButton) {
        shopNowButton.addEventListener('click', function () {
            window.location.href = 'gallery.html';
        });
    } else {
        console.log("Shop Now button not found");
    }

    // Function to handle subscription
    function subscribe() {
        const emailInput = document.querySelector('.newsletter-input').value;
        console.log("Email entered:", emailInput);

        if (emailInput) {
            alert('Thank you for subscribing!');
            document.querySelector('.newsletter-input').value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    }

    // Event Listener for the subscribe button
    const subscribeButton = document.querySelector('.subscribe-button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function () {
            console.log("Subscribe button clicked!");
            subscribe();
        });
    } else {
        console.log("Subscribe button not found");
    }

    // Function to display the cart on cart.html page
    function displayCart() {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const cartItemsContainer = document.getElementById('cart-items');

        if (!cartItemsContainer) {
            console.log("Cart items container not found");
            return;
        }

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let cartHTML = '<ul>';
        cart.forEach(item => {
            cartHTML += `<li><strong>${item.name}</strong>: ${item.description}</li>`;
        });
        cartHTML += '</ul>';

        cartItemsContainer.innerHTML = cartHTML;
    }

    // Function to clear the cart
    function clearCart() {
        sessionStorage.removeItem('cart');
        displayCart();
    }

    // Display cart on cart.html
    displayCart();

    // Add event listeners for "Clear Cart" and "Checkout" buttons
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout');

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    } else {
        console.log("Clear Cart button not found");
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Proceeding to checkout');
        });
    } else {
        console.log("Checkout button not found");
    }

    // Add event listeners for "Add to Cart" buttons on gallery.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    console.log(`Found ${addToCartButtons.length} add-to-cart buttons`);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const product = {
                    name: productCard.getAttribute('data-product-name'),
                    description: productCard.getAttribute('data-product-description')
                };
                addToCart(product);
            } else {
                console.log("Product card not found");
            }
        });
    });

    // Function to add item to cart and store in session storage
    function addToCart(product) {
        // Retrieve the cart from session storage or initialize as empty array
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Add the new product to the cart
        cart.push(product);

        // Save the updated cart back to session storage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Alert the user that the item has been added
        alert(`${product.name} has been added to your cart!`);
    }
});

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the submit button and the form
    const submitBtn = document.getElementById('submitBtn');
    const form = document.querySelector('.contact-form-section form');

    // Add an event listener for the form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Show an alert with a thank you message
        alert("Thank you for your message!");

        // Optionally, you can also clear the form fields after submission
        form.reset();
    });
});

//................. form adding to local storage............
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the submit button and the form
    const form = document.querySelector('.contact-form-section form');

    // Add an event listener for the form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const feedback = document.getElementById('feedback').value;
        const customOrder = document.getElementById('customOrder').checked;

        // Create an object to hold the data
        const orderData = {
            name: name,
            email: email,
            phone: phone,
            feedback: feedback,
            customOrder: customOrder
        };

        // Save to local storage
        let existingOrders = JSON.parse(localStorage.getItem('customOrders')) || [];
        existingOrders.push(orderData);
        localStorage.setItem('customOrders', JSON.stringify(existingOrders));

        // Show an alert with a thank you message
        alert("Thank you for your order request!");

        // Optionally, you can also clear the form fields after submission
        form.reset();
    });
});
