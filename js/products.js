const cartEl = document.querySelector(".nav_bag");
const cartContainer = document.querySelector(".cart_container");
const closeCart = document.querySelector("#close_icon");
const productsContainerEl = document.querySelector(".products_container");
const laptopsContainerEl = document.querySelector(".laptop_Container");
const cartProductEl = document.querySelector(".cart_products");
const totalPriceEl = document.querySelector(".totalPrice");
const cartItemsEl = document.querySelector(".items");
const btnClear = document.querySelector(".btn_clear");
cartEl.addEventListener("click", () => {
  cartContainer.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartContainer.classList.remove("active");
});
let products = [
  {
    id: 1,
    image: "https://i.postimg.cc/5NDSYvTB/2021-hero-mobile-2.jpg",
    title: "Lynx Gaming PC by Digital Storm",
    desc: "",
    price: 22000,
    instock: 1,
  },
  {
    id: 2,
    image: "https://i.postimg.cc/mgX1qFWc/CTA-768x768.png",
    title: "DreamCore-h200tg gaming pc",
    desc: "",
    price: 16000,
    instock: 1,
  },
  {
    id: 3,
    image: "https://i.postimg.cc/cLrLv9PH/1678219621-player-prime-hero-primary-sm.png",
    title: "NZXT-Pro Gaming Performance PC",
    desc: "",
    price: 29000,
    instock: 1,
  },
  {
    id: 4,
    image: "https://i.postimg.cc/5yDbL1h2/bre-single-pc-lr-plvgz8go5mpz8jdp2o92qi6lszkwbbfxflv3n580lw.jpg",
    title: "STINCE-built Pro Gaming PC",
    desc: "",
    price: 25000,
    instock: 1,
  },
  {
    id: 5,
    image: "https://i.postimg.cc/BnS4FhyD/antec-performance-1-ft.webp",
    title: "ANTEC Gaming Performance PC+",
    desc: "",
    price: 42000,
    instock: 5,
  },
  
];
function renderProducts() {
  productsContainerEl.innerHTML = "";
  products.forEach((product) => {
    const { id, title, image, price } = product;
    const productEl = document.createElement("div");
    productEl.innerHTML = `
        <div class="product">
        <div class="product_img card2">
            <img src="${image}" alt="${title}">
            </br>
        </div>
        <div class="product_title">
        <h3>${title}</h3>
        </div>
        <div class="product_price">
        <h3>Price: R${price}</h3>
        </div>
        <div class="product_btn">
            <button onClick="addToCart(${id})">Add to Cart</button>
        </div>
    </div>
    <br>
    <br>
        `;

    productsContainerEl.appendChild(productEl);
  });
}
renderProducts();




// get items from localStorage
let cart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
updateCart();
function renderCartProducts() {
  cartProductEl.innerHTML = "";
  cart.forEach((product) => {
    const { id, title, image, price, numberOfUnits } = product;
    const cartProduct = document.createElement("div");
    cartProduct.innerHTML = `
        <div class="cartProduct">
        <div class="cart_product_flex">
        <div class="cart_product_img">
        <img src="${image}" alt="${title}" class="cart_img">
    </div>
    <div class="cart_product_title">
    <h3>${title}</h3>
    </div>
        </div>
        <div class="cart_product_price">
        <h3>Price: R${price}</h3>
        </div>
        <div class="cart_amount">
        <p class="decrement" onclick="changeNumberOfUnits('minus', ${id})">-</p>
        <div class="number">${numberOfUnits}</div>
        <p class="increment" onclick="changeNumberOfUnits('plus', ${id})">+</p>
        </div>
        <div class="cart_product_btn">
            <p onClick="removeFromCart(${id})"><i class='bx bxs-trash-alt'></i></p>
        </div>
    </div>
        `;

    cartProductEl.appendChild(cartProduct);
  });
}

renderCartProducts();

// add to cart functionality

function addToCart(id) {
  // check if there is an existing product in the cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const product = products.find((product) => product.id === id);
    cart.push({
      ...product,
      numberOfUnits: 1,
    });
  }

  updateCart();
}
// remove from cart functionality

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// updating our cart

function updateCart() {
  renderCartTotal();
  renderCartProducts();
  localStorage.setItem("cartItems", JSON.stringify(cart));
}
updateCart();

// change amount

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
changeNumberOfUnits();

// cart total price

function renderCartTotal() {
  let totalCartPrice = 0;
  totalCartAmount = 0;

  cart.forEach((item) => {
    totalCartPrice += item.price * item.numberOfUnits;
  });

  totalPriceEl.innerHTML = `Total Price: R${totalCartPrice.toFixed(2)}`;
}

// clear cart

btnClear.addEventListener("click", () => {
  clearCart();
});
function clearCart() {
  if (cart.length >= 1) {
    if (confirm("Do you want to clear the cart")) {
      cart = [];
      localStorage.setItem("cartItems", JSON.stringify(cart));
      updateCart();
    }
  }
}