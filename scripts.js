const product=[{
  id:111,
  image:'./assets/images/image-waffle-desktop.jpg',
  category: 'Waffle',
  name: 'Waffle with Berries',
  priceCent:660
},
{ id:222,
  image :'./assets/images/image-creme-brulee-desktop.jpg',
  category: 'Crème Brûlée',
  name : 'Vanilla Bean Crème Brûlée',
  priceCent: 700
},
{id:333,
  image :"./assets/images/image-macaron-desktop.jpg",
  category: 'Macaron',
  name : 'Macaron Mix of Five',
  priceCent: 800
},
{ id:444,
  image :"./assets/images/image-tiramisu-desktop.jpg",
  category: 'Tiramisu',
  name : 'Classic Tiramisu',
  priceCent: 550
},
{id:555,
  image :"./assets/images/image-baklava-desktop.jpg",
  category: 'Baklava',
  name : 'Pistachio Baklava',
  priceCent: 400
},
{id:666,
  image :"./assets/images/image-meringue-desktop.jpg",
  category: "Pie",
  name : "Lemon Meringue Pie",
  priceCent: 500
},
{id:777,
  image :"./assets/images/image-cake-desktop.jpg",
  category: 'Cake',
  name : 'Red Velvet Cake',
  priceCent: 450
},
{id:888,
  image :"./assets/images/image-brownie-desktop.jpg",
  category: 'Brownie',
  name : "Salted Caramel Brownie",
  priceCent: 550
},
{id:999,
  image :"./assets/images/image-panna-cotta-desktop.jpg",
  category: 'Panna Cotta',
  name : "Vanilla Panna Cotta",
  priceCent: 650
}
];

let productHTML='';

product.forEach((product)=>{
  productHTML += ` 
          <div class="products-container" data-category="${product.category}">
            <div class="thumbnails">
              <img class="js-food-image" data-image="${product.image}" src="${product.image}" alt="${product.name}">
             <button class="button" data-product-id="${product.id}" data-name="${product.name}"
             data-image="${product.image}" data-price="${product.priceCent}">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="minus" >
              <img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart
              <img class="plus" src="./assets/images/icon-increment-quantity.svg" alt="plus">
            </button>
            </div>
            <span>${product.category}product</span>
            <p class="food-name">${product.name}</p>
            <small  id="price">$${(product.priceCent/100).toFixed(2)}</small>
          </div>`;
});
document.querySelector('.main-container').innerHTML = productHTML;

const buttons = document.querySelectorAll('.button');
const images = document.querySelectorAll('.js-food-image');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

const cartItemsBox = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const confirmOrderButton = document.getElementById("confirm-order");
 
const products = [
  { name: "Waffle with Berries", priceCent: 550, quantity: 0 }, 
  { name: "Vanilla Bean Crème", priceCent: 700, quantity: 0 },
  { name: "Macaron Mix of Five", priceCent: 800, quantity: 0 }, 
  { name: "Classic Tiramisu", priceCent: 500, quantity: 0 },

  { name: "Pistachio Baklava", priceCent: 400, quantity: 0 }, 
  { name: "Lemon Meringue Pie", priceCent: 500, quantity: 0 },

  { name: "Red Velvet Cake", priceCent: 450, quantity: 0 },

  { name: "Salted Caramel Brownie", priceCent: 550, quantity: 0 },

  { name: "Vanilla Panna Cotta", priceCent: 650, quantity: 0 },
];

function updateCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-items");
  cartItem.innerHTML = 
   ` <div class="first-portion">
      <p class="food-name">${product.name}</p>
      <div class="under-portion">
        <div>
          <span class="quantity">${product.quantity}x&nbsp;</span> 
          <span class="price">&nbsp;@$ ${product.priceCent / 100}</span> 
          <span class="quantity-total">&nbsp;&nbsp;$${(product.quantity * product.priceCent / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
    <img src="/assets/images/icon-remove-item.svg" alt="">`
  return cartItem;
};
function updateTotalPrice() {
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += (product.quantity * product.priceCent / 100);
  });
  totalPriceElement.textContent = totalPrice.toFixed(2);
};










// Handle add to cart button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (event) => {
    if (event.target.classList.contains("button")) {
      const productId = parseInt(event.target.dataset.productId);
      const product = products.find(p => p.id === productId); // Find the product in your data
      if (product) {
        product.quantity++;
        const cartItem = updateCartItem(product);
        cartItemsContainer.appendChild(cartItem);
        updateTotalPrice();
      }
    }
      const target = event.target;
      const productId = button.dataset.productId;
      const productName = button.dataset.name;
      const productImage = button.dataset.image;
      const productPrice = button.dataset.price;
      const quantitySpan = button.querySelector('.quantity');
      const addToCartSpan = button.querySelector('.add-to-cart');
      const minusIcon = button.querySelector('.minus');
      const plusIcon = button.querySelector('.plus');

      if (target === addToCartSpan || target === plusIcon) {
          if (!(productId in cart)) {
              cart[productId] = {
                  id: productId,
                  name: productName,
                  image: productImage,
                  price: productPrice,
                  quantity: 1
              };
          } else {
              cart[productId].quantity++;
          }
          quantitySpan.textContent = cart[productId].quantity;
          addToCartSpan.style.display = 'none';
          minusIcon.style.display = 'inline-block';
          plusIcon.style.display = 'inline-block';
          updateCartItems();
      } else if (target === minusIcon) {
          if (cart[productId].quantity > 1) {
              cart[productId].quantity--;
          } else {
              delete cart[productId];
          }
          quantitySpan.textContent = cart[productId].quantity || 0;
          if (cart[productId].quantity === 0) {
              addToCartSpan.style.display = 'inline-block';
              minusIcon.style.display = 'none';
              plusIcon.style.display = 'none';
          }
          updateCartItems();
      }
  });
});

//Clear cart for demonstration purposes (you'll need to handle removing items)
function clearCart() {
  cartItemsContainer.innerHTML = '';
  products.forEach(product => product.quantity = 0);
  updateTotalPrice();
}
clearCart(); // Clear the cart initially

// Confirm Order Logic (you'll need to handle order submission)
// Confirm Order Logic (you'll need to handle order submission)
confirmOrderButton.addEventListener('click', () => {
  // Example: Display an alert with the order details
  let orderDetails = '';
  products.forEach(product => {
    if (product.quantity > 0){
      
      orderDetails += ${product.name}: ${product.quantity}x - $${(product.quantity * product.priceCent / 100).toFixed(2)}n;
    }
  });
  alert("Your Order:n" + orderDetails + "nTotal: $" + totalPriceElement.textContent);
});