let cart = [];

// menambahkan produk ke keranjang
function addToCart(productName, productPrice, button) {
    const quantityInput = button.previousElementSibling;
    const quantity = parseInt(quantityInput.value);  

    if (quantity <= 0) {
        alert("Jumlah Produk Tidak Boleh Nol.");
        return;
    }

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
      // Jika Produk sudah ada di keranjang, tambahkan jumlahnya
      cart[existingProductIndex].quantity += quantity;
    } else {
        // Jika produk belum ada, tambahkan ke keranjang
        cart.push({ name: productName, price: productPrice, quanity: quantity });
    }
        updateCart();
}

// Memperbarui tampilan keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
    })
}