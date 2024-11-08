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
      
    }
}