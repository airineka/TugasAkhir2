let cart = [

//const cart = [
    { name: "Mobil Mainan", quantity: 1, price: 50000 },
    { name: "Sepeda Mainan", quantity: 1, price: 90000 },
    { name: "Telephone", quantity: 1, price: 30000 },
    { name: "Pop It", quantity: 1, price: 65000 },
    { name: "Boneka Beruang", quantity: 1, price: 150000 },
    { name: "Piano Toy", quantity: 1, price: 200000 },
    { name: "Blok Bangunan", quantity: 1, price: 45000 },
    { name: "Mesin Jahit", quantity: 1, price: 35000 },
    { name: "Lato-Lato", quantity: 1, price: 7000 },
    { name: "Boneka Labubu", quantity: 1, price: 10000 },
    { name: "Bike Helmet", quantity: 1, price: 185000 },
    { name: "Kacamata Renang", quantity: 1, price: 12000 },
    { name: "Kolam Anak", quantity: 1, price: 142000 },
    { name: "Trampolin", quantity: 1, price: 830000 },
    { name: "Perosotan", quantity: 1, price: 880000 },
    { name: "Laptop Mainan", quantity: 1, price: 60000 },
    { name: "Mobil Remote", quantity: 1, price: 200000 },
    { name: "Basketball", quantity: 1, price: 125000 },
    { name: "Animal Jumping", quantity: 1, price: 90000 },
    { name: "Pancing Magnet", quantity: 1, price: 17000 },
    { name: "Bath Duck", quantity: 1, price: 20000 },
    { name: "Kaktus", quantity: 1, price: 45000 },
    { name: "Puffer Ball", quantity: 1, price: 20000 },
    { name: "Boneka Dino", quantity: 1, price: 55000 },
    { name: "Small Duck", quantity: 1, price: 38000 },
    { name: "Bubble Gun", quantity: 1, price: 300000 },
];

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
      cart[existingProductIndex].quantity += item.quantity;
    } else {
        // Jika produk belum ada, tambahkan ke keranjang
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }
        updateCart();
}

// Memperbarui tampilan keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    let totalPrice = 0;


   cart.forEach((item, index) => {
    if (typeof item.quantity !== 'number' || typeof item.price !== 'number') {
        console.error("Quantity or price is not a number:", item.quantity, item.price);
        return; // Keluar dari fungsi jika quantity atau price bukan angka
    }
       const itemTotal = item.quantity * item.price;
       totalPrice += itemTotal; 
       cart.forEach(item => {
       console.log(item); // Melihat nilai item
       const itemTotal = item.quantity * item.price;
        console.log(`Item Total: ${itemTotal}`);
       totalPrice += itemTotal;
       });

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
                <span>${item.name} = Rp.${item.price} x ${item.quantity} = Rp.${itemTotal}</span>
                <button onclick="changeQuantity(${index}, -1)">-</button>
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
function resetCart() {
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

