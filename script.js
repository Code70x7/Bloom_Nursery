
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Select the button by its ID
const shopNowButton = document.getElementById('shopNowBtn');

// Add an event listener to the button
shopNowButton.addEventListener('click', function () {
    // Redirect to the gallery page
    window.location.href = 'gallery.html'; // Update the path to your gallery page
});





//JS for the cart
// Function to add items to the cart
function addToCart(item) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} has been added to your cart.`);
}

// Function to view the cart
function viewCart() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = ''; // Clear the previous items

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price} (Quantity: ${item.quantity})`;
            cartList.appendChild(listItem);
        });
    }

    document.getElementById('cart-modal').style.display = 'block'; // Show cart modal
}

// Function to clear the cart
function clearCart() {
    sessionStorage.removeItem('cart');
    alert('Your cart has been cleared.');
}

// Function to handle feedback submission
function submitFeedback(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;

    const feedbackData = {
        name,
        feedback,
        date: new Date().toISOString()
    };

    // Save feedback to localStorage
    const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedbackData);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

    alert('Thank you for your feedback!');
    document.getElementById('feedback-form').reset(); // Reset the form
}

// Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const itemDiv = event.target.closest('.item');
        const item = {
            id: itemDiv.getAttribute('data-id'),
            name: itemDiv.getAttribute('data-name'),
            price: itemDiv.getAttribute('data-price')
        };
        addToCart(item);
    });
});

document.getElementById('view-cart').addEventListener('click', viewCart);
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none'; // Close the modal
});

document.getElementById('feedback-form').addEventListener('submit', submitFeedback);
