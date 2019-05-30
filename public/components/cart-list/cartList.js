function ItemList (CartService) {

const ctrl = this;
ctrl.getList = () => {
  CartService.getCart()
    .then( (data) => {
        ctrl.cartItems = data;
        console.log(ctrl.cartItems);
    })
    .catch( (err) => {
        console.log(err);
    })
}
ctrl.getList();

ctrl.addItem = (item) => {
  CartService.addItem(item);
}

// ************************************************
// Shopping Cart API
// ************************************************

let shoppingCart = (function() {
// =============================
// Private methods and propeties
// =============================
cart = [];

// Constructor
function Item(product, price, quantity) {
this.product = product;
this.price = price;
this.quantity = quantity;
}

// Save cart
function saveCart() {
sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem("shoppingCart") != null) {
loadCart();
}


// =============================
// Public methods and propeties
// =============================
let obj = {};

// Add to cart
obj.addItemToCart = function(product, price, quantity) {
for(let item in cart) {
  if(cart[item].product === product) {
    cart[item].quantity ++;
    saveCart();
    return;
  }
}
let item = new Item(product, price, quantity);
cart.push(item);
saveCart();
}
// Set quantity from item
obj.setquantityForItem = function(product, quantity) {
for(let i in cart) {
  if (cart[i].product === product) {
    cart[i].quantity = quantity;
    break;
  }
}
};
// Remove item from cart
obj.removeItemFromCart = function(product) {
  for(let item in cart) {
    if(cart[item].product === product) {
      cart[item].quantity --;
      if(cart[item].quantity === 0) {
        cart.splice(item, 1);
      }
      break;
    }
}
saveCart();
}

// Remove all items from cart
obj.removeItemFromCartAll = function(product) {
for(let item in cart) {
  if(cart[item].product === product) {
    cart.splice(item, 1);
    break;
  }
}
saveCart();
}

// Clear cart
obj.clearCart = function() {
cart = [];
saveCart();
}

// quantity cart 
obj.totalquantity = function() {
let totalquantity = 0;
for(let item in cart) {
  totalquantity += cart[item].quantity;
}
return totalquantity;
}

// Total cart
obj.totalCart = function() {
let totalCart = 0;
for(let item in cart) {
  totalCart += cart[item].price * cart[item].quantity;
}
return Number(totalCart.toFixed(2));
}

// List cart
obj.listCart = function() {
let cartCopy = [];
for(i in cart) {
  item = cart[i];
  itemCopy = {};
  for(p in item) {
    itemCopy[p] = item[p];

  }
  itemCopy.total = Number(item.price * item.quantity).toFixed(2);
  cartCopy.push(itemCopy)
}
return cartCopy;
}

// cart : Array
// Item : Object/Class
// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// quantityCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function
return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
event.preventDefault();
let product = $(this).data('product');
let price = Number($(this).data('price'));
shoppingCart.addItemToCart(product, price, 1);
displayCart();
});

// Clear items
$('.clear-cart').click(function() {
shoppingCart.clearCart();
displayCart();
});


function displayCart() {
let cartArray = shoppingCart.listCart();
let output = "";
for(let i in cartArray) {
output += "<tr>"
  + "<td>" + cartArray[i].product + "</td>" 
  + "<td>(" + cartArray[i].price + ")</td>"
  + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-product=" + cartArray[i].product + ">-</button>"
  + "<input type='number' class='item-quantity form-control' data-product='" + cartArray[i].product + "' value='" + cartArray[i].quantity + "'>"
  + "<button class='plus-item btn btn-primary input-group-addon' data-product=" + cartArray[i].product + ">+</button></div></td>"
  + "<td><button class='delete-item btn btn-danger' data-product=" + cartArray[i].product + ">X</button></td>"
  + " = " 
  + "<td>" + cartArray[i].total + "</td>" 
  +  "</tr>";
}
$('.show-cart').html(output);
$('.total-cart').html(shoppingCart.totalCart());
$('.total-quantity').html(shoppingCart.totalquantity());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
let product = $(this).data('product')
shoppingCart.removeItemFromCartAll(product);
displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
let product = $(this).data('product')
shoppingCart.removeItemFromCart(product);
displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
let product = $(this).data('product')
shoppingCart.addItemToCart(product);
displayCart();
})

// Item quantity input
$('.show-cart').on("change", ".item-quantity", function(event) {
let product = $(this).data('product');
let quantity = Number($(this).val());
shoppingCart.setquantityForItem(product, quantity);
displayCart();
});

displayCart();

}

angular.module("CartApp")
.component('cartList', {
controller: ItemList,
template: `


<!-- Main -->
<form>
  Product:<br>
  <input type="text" name="product" ng-model="item.product"><br>
  Price:<br>
  <input type="text" name="price" ng-model="item.price"><br>
  Quantity:<br>
  <input type="text" name="quantity" ng-model="item.quantity"><br>
  <button ng-submit="$ctrl.addItem(item)">Add to Shopping Cart</button><br>
</form>

<div ng-repeat = "cart in $ctrl.cartItems" class="card">
  <div class="card-body">
    <h5 class="card-title">{{cart.product}}</h5>
    <p class="card-text"><small class="text-muted">Price: $\{{cart.price}}</small></p>
    <p>Quantity: {{cart.quantity}}</p><button>Edit quantity</button>
    <a href="#" data-product="{{cart.product}}" data-price="{{cart.price}}" class="add-to-cart btn btn-primary" ng-click="">Remove from cart</a>
  </div>
</div>

`
})