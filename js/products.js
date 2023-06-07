const cartEl = document.querySelector(".nav_bag");
const cartContainer = document.querySelector(".cart_container");
const closeCart = document.querySelector("#close_icon");
const productsContainerEl = document.querySelector(".products_container");
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
    image: "https://i.postimg.cc/J0tVbr0j/Acer-Aspire-A5.png",
    title: "Acer_Aspire",
    desc: "",
    price: 6000,
    instock: 1,
  },
  {
    id: 2,
    image: "https://i.postimg.cc/nrKRjNYq/Lenovo-Idea-Pad-3.png",
    title: "Lenovo-IdeaPad",
    desc: "",
    price: 20000,
    instock: 1,
  },
  {
    id: 3,
    image: "https://i.postimg.cc/BQLXxDj7/Logitech-C270-HD-Webcam.png",
    title: "Webcam",
    desc: "",
    price: 15000,
    instock: 1,
  },
  {
    id: 4,
    image: "https://i.postimg.cc/GtsdsFXk/Mavic-Drone-Different-Angle.jpg",
    title: "Mavic-Drone",
    desc: "",
    price: 20000,
    instock: 1,
  },
  {
    id: 5,
    image: "https://i.postimg.cc/P5qhWnVX/Volkano-Zoom-700-Webcam.jpg",
    title: "Webcam",
    desc: "",
    price: 30000,
    instock: 5,
  },
  {
    id: 6,
    image:
      "https://i.postimg.cc/jjQcQ28m/Huawei-Band-7-Wilderness-Green-Silicone-Smartwatch.png",
    title: "Huawei-Band",
    desc: "",
    price: 4000,
    instock: 6,
  },
  {
    id: 7,
    image:
      "https://i.postimg.cc/t47GcQ0B/Daniel-Klein-d-Smart-Blue-Plated-Silicone-Smartwatch.png",
    title: "Daniel-Klein",
    desc: "",
    price: 50000,
    instock: 6,
  },
  {
    id: 8,
    image: "https://i.postimg.cc/gjBNX7M0/Hauwei-Watch-Fit-2.png",
    title: "Huawei-Watch",
    desc: "",
    price: 25000,
    instock: 6,
  },
  {
    id: 9,
    image: "https://i.postimg.cc/nrKRjNYq/Lenovo-Idea-Pad-3.png",
    title: "Lenovo-Idea-Pad",
    desc: "",
    price: 11000,
    instock: 6,
  },
];
function renderProducts() {
  productsContainerEl.innerHTML = "";
  products.forEach((product) => {
    const { id, title, image, price } = product;
    const productEl = document.createElement("div");
    productEl.innerHTML = `
        <div class="product">
        <div class="product_img">
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
