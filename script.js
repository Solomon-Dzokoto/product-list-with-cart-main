const buttons=document.querySelectorAll('.button');


buttons.forEach((button=>{
  button.add.EventListener('click',()=>{
    
  })
}))


document.querySelector('.js-main-container').innerHTML=productHTML
let myButton=document.querySelectorAll('.button') ;
 const foodImage=document.querySelectorAll('.js-food-image');
 const foodName=document.querySelectorAll('.food-name')
 const productName=product.name;
 

function addToCard(productId){
  let matchingItem;
cart.forEach((item)=>{
if(productName===item.productName){
  matchingItem = item;
} 
});
if (matchingItem){
  matchingItem.quantity +=1;
}else{
  cart.push({
    productName:productName,
    quantity:1
  })
}
};


  function updateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.js-cart-number')
      .innerHTML = cartQuantity;
  }
  
  document.querySelectorAll('.button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });