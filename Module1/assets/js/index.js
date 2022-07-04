//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};
//cart working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  //remove Items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity changes
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //buy button work
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}
//buy button
function buyButtonClicked() {
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}
//remove Items from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
//quantity changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//add Cart
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title =
    shopProducts.getElementsByClassName("product-tittle")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
// add product to cart
function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsName = cartItems.getElementsByClassName("cart-product-tittle");
  for (let i = 0; i < cartItemsName.length; i++) {
    if(cartItemsName[i].innerText == title) {
    alert("You have already add this item to cart");
    return;
    }
  }
  let cartBoxContent = ` <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-tittle">${title}</div>

                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove cart -->
                        <i class='bx bx-trash cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}
//update Total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let price = parseInt(priceElement.innerText.replace("$", ""));
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let quantity = quantityElement.value;
    total += price * quantity;
 }
    //if price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
 
  console.log(updateTotal);
}
