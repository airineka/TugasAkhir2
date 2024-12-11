const products = [

//const cart = [];
    { name: "Mobil Mainan", quantity: 1, price: 50000,  category: 'mainan', image: 'Mobil Mainan.jpg' },
    { name: "Sepeda Mainan", quantity: 1, price: 90000, category: 'mainan',  image: 'funbike-vespa-warna-kuning.png' },
    { name: "Telephone", quantity: 1, price: 30000, category: 'mainan', image: 'Telephonemobil tarik.jpg' },
    { name: "Pop It", quantity: 1, price: 65000, category: 'mainan', image: 'img11012-1690972867.jpg' },
    { name: "Boneka Beruang", quantity: 1, price: 150000, category: 'mainan', image: 'Boneka Beruang.jpg' },
    { name: "Piano Toy", quantity: 1, price: 200000, category: 'mainan', image: 'https___twitter_com_MomsTrustyDeals_status_1015301990774165507 ☝️🔥Enter Multi-Use code 25AN096PI at checkout for 25% OFF🔥☝️ 👉Prices_codes valid at time posted & can expire at anytime.jpeg' },
    { name: "Blok Bangunan", quantity: 1, price: 45000, category: 'mainan', image: 'tausendkind Online Shop für Baby- & Kinderausstattung.jpeg' },
    { name: "Mesin Jahit", quantity: 1, price: 35000, category: 'mainan', image: 'mesin jahit.jpeg' },
    { name: "Lato-Lato", quantity: 1, price: 7000, category: 'mainan', image: 'Bola Klakson, Latto, Mainan, Klakson PNG Transparan Clipart dan File PSD untuk Unduh Gratis.jpeg' },
    { name: "Boneka Labubu", quantity: 1, price: 10000, category: 'mainan', image: 'download (1).jpeg' },
    { name: "Bike Helmet", quantity: 1, price: 185000, category: 'mainan', image: 'Miniz Mouse.jpeg' },
    { name: "Kacamata Renang", quantity: 1, price: 12000, category: 'mainan', image: 'download.jpeg' },
    { name: "Kolam Anak", quantity: 1, price: 142000, category: 'mainan', image: 'kolam anak.jpeg' },
    { name: "Trampolin", quantity: 1, price: 830000, category: 'mainan', image: 'trampolin.jpeg' },
    { name: "Perosotan", quantity: 1, price: 880000, category: 'mainan', image: 'trampolin.jpeg' },
    { name: "Laptop Mainan", quantity: 1, price: 60000, category: 'mainan', image: 'laptop mainan.jpeg' },
    { name: "Mobil Remote", quantity: 1, price: 200000, category: 'mainan', image: 'mobil remote.jpeg' },
    { name: "Basketball", quantity: 1, price: 125000, category: 'mainan', image: 'basketball.jpeg' },
    { name: "Animal Jumping", quantity: 1, price: 90000, category: 'mainan', image: 'animal jumping.jpeg  ' },
    { name: "Pancing Magnet", quantity: 1, price: 17000, category: 'mainan', image: 'pancing.jpeg' },
    { name: "Bath Duck", quantity: 1, price: 20000, category: 'mainan', image: 'Novelty Place Assorted Rubber Ducks.jpeg' },
    { name: "Kaktus", quantity: 1, price: 45000, category: 'mainan', image: 'kaktus.jpeg' },
    { name: "Puffer Ball", quantity: 1, price: 20000, category: 'mainan', image: 'pufferball.jpeg' },
    { name: "Boneka Dino", quantity: 1, price: 55000, category: 'mainan', image: 'Dinosaur soft toy.jpeg' },
    { name: "Small Duck", quantity: 1, price: 38000, category: 'mainan', image: 'small duck.jpeg' },
    { name: "Bubble Gun", quantity: 1, price: 300000, category: 'mainan', image: 'bubble gun.jpeg' },
];
const cart = [];

// Fungsi untuk memuat produk dari API atau localStorage
function loadProducts() {
    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
        const products = JSON.parse(storedProducts);
        displayProducts(products);
    } else {
        fetch('https://fakestoreapi.com/product')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('products', JSON.stringify(data));
                displayProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error)); 
    }
    }

// untuk mengambil data produk dari API
async function fetchProducts() {
    const cacheKey = 'productsCache';
    const cachedData = localStorage.getItem(cacheKey);  

    if (cachedData) {
        displayProducts(JSON.parse(cachedData));
    } else {
        try {
            const response = await fetch('https://fakestoreapi.com/product');
            const products = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify(products));
            displayProducts(products);
        } catch (error) {
            console.error();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

// menambahkan produk ke keranjang
function addToCart(productName, productPrice, button) {
    console.log(`Menambahkan ${productName} ke keranjang dengan harga ${productPrice}`);
    const quantityInput = button.previousElementSibling;
    const quantity = parseInt(quantityInput.value); 
    console.log(`Jumlah yang dipilih: ${quantity}`);


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
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }}

    // Simpan keranjang ke LocalStorage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
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

// fungsi untuk memperbarui jumlah produk di keranjang
function updateCartItem(productName, quantity) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        if (quantity <= 0) {
            removeFromCart(productName);
        } else {
            cart[existingProductIndex].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateLocalStorage(); // Update localStorage setelah perubahan 
            displayCart(); // Tampilkan ulang keranjang setelah perubahan
        }
    }
}

    // fungsi untuk menampilkan produk
    function displayProducts(productList) {
        const productList = document.getElementById('product-list');
        productListContainer.innerHTML = ''; //kososngkan daftar produk

        productList.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className='product';
            productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}";
            <p>Harga: Rp. ${product.price.toLocaleString()}</p>
            <input type="number" min="1" value="1" class="quantity" />
            <button onclick="addToCart('${product.name}', ${product.price}, this)">Tambahkan ke Keranjang</button>
            `;
            productListContainer.appendChild(productDiv);
        } );
    }

    function searchProduct() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)   
        );
        displayProducts(filteredProducts);
        }
    
        // Fungsi untuk mencari produk
    function searchProduct() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredProduct = product.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    // Memfilter produk
    function filterProducts() {
        const categoryFilter = document.getElementById('category-filter').value;
        const searchInput = document.getElementById('search-input').value.toLowerCase();

        const filteredProducts = products.filter(product => {
            const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
            const matchesSearch = product.name.toLowerCase().includes(searchInput);
            return matchesCategory && matchesSearch;
     });

     displayProducts(filteredProducts);
    }

    // Event listener untuk filter kategori
    document.getElementById('category-filter').addEventListener('change', filterProducts);

    // Event Listener untuk pencarian
    document.getElementById('search-input').addEventListener('input', filterProducts);

    displayProducts(products);

    // Menyegarkan data
function refreshData() {
    localStorage.removeItem('products'); // Hapus data dari localStorage
    loadProducts(); // Muat ulang produk dari API
}

// Event Listener untuk tombol segarkan
document.getElementById('refresh-button').addEventListener('click', refreshData);

// Muat produk saat halaman dimuat
window.addEventListener('load', loadProducts);


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
    updateLocalStorage(); // Update localStorage setelah penghapusan
    displayCart(); // Tampilkan ulang keranjang setelah penghapusan
}

// Checkout
document.getElementById('checkout-form').addEventListener('submit' , function(event) {
    event.preventDefault(); 

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('Alamat').value;
    const creditCard = document.getElementById('credit-card').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const expiryDate = document.getElementById('expiry-date').value;

    // Validasi Form
    if (!fullName || !email || !phone || !address || !paymentMethod) {
        alert("Semua field harus diisi!");
        return;
    }

    // Validasi email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Email tidak valid');
        return false;
    }

    // Validasi nomor telepon
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Nomor telepon tidak valid');
        return false;
    }

    // Validasi nomor kartu kredit jika metode pembayaran kartu kredit 
    if (paymentMethod.value === 'credit-card') {
        const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3(?:[0-9]{4}|[0-9]{4} [0-9]{6})[0-9]{5})$/;
        if (!creditCardRegex.test(creditCard)) {
            alert('Nomor kartu kredit tidak valid');
            return false;
        }
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

