const products=[{
  image:'./assets/images/image-waffle-desktop.jpg',
  category: 'Waffle',
  name: 'Waffle with Berries',
  priceCent:660
},
{
  image :'./assets/images/image-creme-brulee-desktop.jpg',
  category: 'Crème Brûlée',
  name : 'Vanilla Bean Crème Brûlée',
  priceCent: 700
},
{
  image :"./assets/images/image-macaron-desktop.jpg",
  category: 'Macaron',
  name : 'Macaron Mix of Five',
  priceCent: 800
},
{
  image :"./assets/images/image-tiramisu-desktop.jpg",
  category: 'Tiramisu',
  name : 'Classic Tiramisu',
  priceCent: 550
},
{
  image :"./assets/images/image-baklava-desktop.jpg",
  category: 'Baklava',
  name : 'Pistachio Baklava',
  priceCent: 400
},
{
  image :"./assets/images/image-meringue-desktop.jpg",
  category: "Pie",
  name : "Lemon Meringue Pie",
  priceCent: 500
},
{
  image :"./assets/images/image-cake-desktop.jpg",
  category: 'Cake',
  name : 'Red Velvet Cake',
  priceCent: 450
},
{
  image :"./assets/images/image-brownie-desktop.jpg",
  category: 'Brownie',
  name : "Salted Caramel Brownie",
  priceCent: 550
},
{
  image :"./assets/images/image-panna-cotta-desktop.jpg",
  category: 'Panna Cotta',
  name : "Vanilla Panna Cotta",
  priceCent: 650
}
];

let productsHTML='';

products.forEach((product)=>{
  productsHTML += ` 
          <div class="products-container">
            <div class="thumbnails">
              <img id="image1" src="${product.image}" alt="">
             <button class="button" data-image-id="image1">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="minus" >
              <img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart
              <img class="plus" src="./assets/images/icon-increment-quantity.svg" alt="plus">
            </button>
            </div>
            <span>${product.category}product</span>
            <p id="food-name">${product.name}</p>
            <small  id="price">$${(product.priceCent)}</small>
          </div>`;
});
console.log(productsHTML);

document.querySelector('.js-main-container').innerHTML=productsHTML

