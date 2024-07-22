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
 

let productsHTML='';

products.forEach((product)=>{
  productsHTML += `
             <div id="${product.id}" class="products-container">
            <div class="thumbnails">
              <img class="img" id="image1" src=${product.image} alt="">
             <button class="button js-add-to-cart" data-product-image="${product.image}"
             data-product-name="${product.name}"
             data-product-id="${product.id}">
              <i class="fa-solid fa-minus"></i>
              <div class="cart-image">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
               </div>
              <span class="display-quantity"></span>
              Add to Cart
              <i class="fa-solid fa-plus"></i>
            </button>
            </div>
            <span>Waffle</span>
            <p class="food-name">${product.name}</p>
            <small  class="price">$${(product.priceCent/100).toFixed(2)}</small>
          </div>
  `
}
);
document.querySelector('.js-main-container').innerHTML = productsHTML;


const buttons=document.querySelectorAll('.js-add-to-cart');

buttons.forEach((button)=>{
  button.addEventListener('click',()=>{
    const productName=button.dataset.productName;
    const productImage=button.dataset.productImage;
    const productId=button.dataset.productId;
    const productContainer=button.parentNode;
    const imageElement=productContainer.querySelector('.img');
    imageElement.style.border="2px solid #c73a0f";
    button.style.color="white";
    button.style.backgroundColor="#c73a0f";
    const plus=document.querySelectorAll('.fa-plus')
 
    let sameItem;
    cart.forEach((cartItem)=>{
      if (productName===cartItem.productName){
        sameItem=cartItem;
      }
    });
    if(sameItem){
    sameItem.quantity+=1;
    }
    else{
      cart.push({
        productName:productName,
        quantity:1
      });
    };

    let cartQuantity =0;
    cart.forEach((cartItem)=>{
       cartQuantity +=cartItem.quantity;
    });
    document.querySelector('.js-card-number').innerHTML= cartQuantity;

    console.log(cart)
  })
});

function reduceQuantity(cartItem,cartQuantity){
 if(cartItem.quantity >= 1){
  cartItem.quantity -= 1;
 }
};

function increaseQuantity(cartItem,cartQuantity){
  cartItem.quantity += 1;
}
const minusIcon=document.querySelectorAll('.fa-minus');
const plusIcons = document.querySelectorAll('.fa-plus');

minusIcon.forEach(minusIcon=>{
  minusIcon.addEventListener('click',()=>{
    const productContainer=minusIcon.closest('.products-container');
    const productId=productContainer.dataset.productId;
    const cartItem = cart.find(item => item.Id === productId);
   if (cartItem){
    reduceQuantity(cartItem,cartQuantity)
   }

   updateProductQuantity(productContainer, cartItem);

  });
})

plusIcons.forEach(plusIcon => {
  plusIcon.addEventListener('click', () => {
    const productContainer = plusIcon.closest('.products-container');
    const productId=productContainer.dataset.productId;
    const cartItem = cart.find(item => item.Id === productId);
    if (cartItem) {
      increaseQuantity(cartItem,cartQuantity);
      updateProductQuantity(productContainer, cartItem);
    }
  });
});


function updateProductQuantity(productContainer, cartItem) {
  // Update the quantity display in the button
  const quantityDisplay = productContainer.querySelector('.display-quantity');
  quantityDisplay.textContent = cartItem.quantity;

  const addToCartButton = productContainer.querySelector('.add-to-cart'); 
  //addToCartButton.style.display = 'none';
}





   
