const products = [
  { id: 111,
     name: "Waffle with Berries",
      category: "Breakfast",
       priceCent: 550,
        image: "./assets/images/image-waffle-desktop.jpg",
         quantity: 0
         }, 
  { id: 222,
     name: "Vanilla Bean Crème", 
     category: "Bean Crème",
      priceCent: 700, 
      image: "./assets/images/image-creme-brulee-desktop.jpg",
       quantity: 0 
      },
  { id: 333,
     name: "Macaron Mix of Five", 
     category: "Macaron",
      priceCent: 800,
       image: "./assets/images/image-macaron-desktop.jpg", 
       quantity: 0
       },
  { id: 444,
     name: "Classic Tiramisu",
      category: "Tiramisu", 
     priceCent: 550,
      image: "./assets/images/image-tiramisu-desktop.jpg", quantity: 0
     },
  { id: 555,
     name: "Pistachio Baklava", 
     category: "Baklava",
      priceCent: 400, 
      image: "./assets/images/image-baklava-desktop.jpg" , quantity: 0 
    },
  { id: 666,
     name: "Lemon Meringue Pie", 
     category: "Pie",
      priceCent: 450,
       image:"./assets/images/image-meringue-desktop.jpg", quantity: 0
       },
  { id: 777, 
    name: "Red Velvet Cake", 
    category: "cake",
     priceCent: 550, 
     image: "./assets/images/image-cake-desktop.jpg" , quantity: 0
     },
  { id: 888,
     name: "Salted Caramel Brownie", 
     category: "Brownie",
      priceCent: 450,
       image: "./assets/images/image-brownie-desktop.jpg",
        quantity: 0
       },
  { id: 999,
     name: "Vanilla Panna Cotta",
      category: "anna Cotta", 
      priceCent: 650,
       image: "./assets/images/image-panna-cotta-desktop.jpg",
        quantity: 0 },
];
 

let productsHTML = '';

products.forEach((product) => {
  productsHTML += 
                `
             <div id="${product.id}" class="products-container">
             <div class="thumbnails">
              <img class="img" id="image1" src=${product.image} alt="">
             <button class="button js-add-to-cart" data-product-id="${product.id}" >
              <i class="fa-solid fa-minus js-minus-button" data-product-id="${product.id}"></i>
              <div class="cart-image">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
               </div>
              <span class="display-quantity" data-product-id="${product.id}">0</span>
              <p class="add">
              Add to Cart
              </p>
              <i class="fa-solid fa-plus js-plus-button" data-product-id="${product.id}"></i>
            </button>
            </div>
            <span>Waffle</span>
            <p class="food-name">${product.name}</p>
            <small  class="price">$${(product.priceCent/100).toFixed(2)}</small>
          </div>
  `
});
document.querySelector('.js-main-container').innerHTML = productsHTML;


const buttons = document.querySelectorAll('.js-add-to-cart');
const minusButtons = document.querySelectorAll('.js-minus-button');
const plusButtons = document.querySelectorAll('.js-plus-button');
const quantityDisplays = document.querySelectorAll('.display-quantity'); 
let displayQuantity=document.querySelector('.display-quantity');


const cart=[];

// Handle Add to Cart Click
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const productContainer=button.parentNode;
    const imageElement=productContainer.querySelector('.img');
    imageElement.style.border="2px solid #c73a0f";
    button.style.color="white";
    button.style.backgroundColor="#c73a0f";
    button.style.width="80%";
    button.style.display="flex";
    button.style.gap="3rem";
        // Check if the item is already in the cart
       const isItemInCart = cart.some(item => item.id === parseInt(button.dataset.productId));

      if (!isItemInCart) { // Only add if not already in the cart
          updateCart(button.dataset.productId, 1); // Increase quantity by 1
          updateCartQuantityDisplay(button.dataset.productId);
        }     
    const productText=button.parentNode;
    let text= productText.querySelector('.add');
     text.style.display="none";
     const cartImage=button.parentNode;
     const image=cartImage.querySelector('.cart-image');
     image.style.display="none";

     const moreInfo=document.querySelector('.more-info');
     moreInfo.style.display='block';
     
     updateTotalPrice();
     updateCartDisplay();
     calculateCartTotal();
     console.log(button)

  });
});

// Handle Minus Button Click
minusButtons.forEach((button) => {
  button.addEventListener('click', () => {
  updateCart(button.dataset.productId, -1);
    // Decrease quantity by 1
    updateCartQuantityDisplay(button.dataset.productId);
    updateTotalPrice();
    dialog.showModal();
  });
});

// Handle Plus Button Click
plusButtons.forEach((button) => {
  button.addEventListener('click', () => {
   updateCart(button.dataset.productId, 1);
     // Increase quantity by 1
    updateCartQuantityDisplay(button.dataset.productId);
    updateTotalPrice()
  });
});

// Update Cart Function
function updateCart(productId, quantityChange) {
  const productIndex = cart.findIndex(item => item.id === parseInt(productId));

  if (productIndex !== -1) {
    cart[productIndex].quantity += quantityChange;
    if (cart[productIndex].quantity < 1) {
      cart.splice(productIndex, 1); 
    }
  } else {
    const product = products.find(item => item.id === parseInt(productId));
    const totalPrice = calculateCartTotal(cart);
    cart.push({
      id: product.id,
      name: product.name,
      quantity: quantityChange,
      priceCent:product.priceCent // Initialize quantity for new item
    });
  }
 

  updateCartTotalQuantity();
}

// Update Total Cart Quantity
function updateCartTotalQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-card-number').innerHTML = cartQuantity;
}



function updateCartQuantityDisplay(productId) {
  // Select the quantity display for the specific product 
  const quantityDisplay = document.querySelector(`.display-quantity[data-product-id="${productId}"]`);


  if (quantityDisplay) {
    const cartItem = cart.find(item => item.id === parseInt(productId));
    if (cartItem) {
      quantityDisplay.textContent = cartItem.quantity;
    } else {
      quantityDisplay.textContent = '0';
    }
  }
};

function updateTotalPrice() {
  const totalPrice = calculateCartTotal();
  document.getElementById('totalPrice').textContent = "$" + totalPrice.toFixed(2);}

function calculateCartTotal() {
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += (item.priceCent / 100) * item.quantity; // Calculate total based on quantity
  });
  return totalPrice;
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const cartItem = event.target.closest('.cart-item'); // Get the closest cart item

    // Get the product ID from the cart item
    const productId = cartItem.querySelector('.food-name').textContent;

    // Remove the item from the cart array
    const productIndex = cart.findIndex(item => item.name === productId);
    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
    }
    updateCartTotalQuantity(); 
    updateTotalPrice(); 
    updateCartDisplay();
  }
});



function updateCartDisplay() {
  const cartList = document.querySelector('.cart-box');
  cartList.innerHTML = ''; 

  cart.forEach((item) => {
    let cartItem = document.createElement('div'); // Create a <div> for each cart item
    cartItem.classList.add('cart-item'); 
    cartItem.innerHTML = 
    `
      <div class="first-portion">
        <p class="food-name">${item.name}</p>
        <div class="under-portion">
          <div>
            <span class="quantity">${item.quantity}x &nbsp;</span> 
            <span class="price">&nbsp;@$ ${(item.priceCent / 100).toFixed(2)}</span> 
            <span class="quantity-total">&nbsp;&nbsp;$${(item.quantity * (item.priceCent / 100)).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <i class="fa-solid fa-xmark remove-item"></i>
      `
    ;
   
    cartList.appendChild(cartItem); 
  });
  const totalPrice = calculateCartTotal();
  const totalPriceElement = document.getElementById('total-price'); 
  totalPriceElement.textContent = "$" + totalPrice.toFixed(2);      
};

const popUp=document.getElementById('popup');
const openPopUp=document.getElementById('confirm-order');
const closePopUp=document.getElementById('new-order');

openPopUp.addEventListener('click',()=>{
  popUp.showModal();
});

closePopUp.addEventListener('click',()=>{
  popUp.close();
})



