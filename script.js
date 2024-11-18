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

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
                <span>${item.name} - Rp.${item.price} x ${item.quantity} = Rp.&{itemTotal}</span>
                <button onclick="changeQuantity(&{index}, -1)">-</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Hapus</button>
                `;
                cartItemsContainer.appendChild(itemDiv)
    });

    document.getElementById('total-price').innerText = `Total Harga: Rp.${totalPrice}`;
}

// Mengubah jumlah produk di keranjang
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// Menghapus produk dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
document.getElementById('checkout-form').addEventListener('submit' , function(event) {
    event.preventDefault(); 

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('Alamat').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const expiryDate = doocument.getElementById('expiry-date').value;

    // Validasi Form
    if (!fullName || !email || !phone || !address || !paymentMethod) {
        alert("Semua field harus diisi!");
        return;
    }

    if (paymentMethod === "Kartu Kredit" && !expiryDate) {
        alert("Tanggal kadaluarsa harus diisi jika metode pembayaran adalah Kartu Kredit.");
        return;
    }

    //Jika semua validasi berhasil
    alert("Checkout berhasil! Terima Kasih, " + fullName);
    resetCart();
});

// reset keranjang dan form
function reserCart() {
    cart = [];
    updateCart();
    document.getElementById('checkout-form').reset();
}

// Menambahkan tooltip
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.innerText = input.getAttribute('placeholder');
    input.parentElement.insertBefore(tooltip, input.nextSibling);

    input.addEventListener('focus', () => {
        tooltip.style.display = 'block';
    });
    input.addEventListener('blur', () => {
        tooltip.style.display = 'none';
    });
});

// Menampilkan pesan sukses atau error
document.getElementById('reset-cart').addEventListener('click', resetCart);
