function ItemList (CartService) {

  const ctrl = this;

  // // RETURN LIST OF ITEMS IN CART

  // ctrl.getItems = () => {
  //   CartService.getCart()
  //   .then( (data) => {
  //     ctrl.cartItems = data;
  //   })
  //   .catch( (err) => {
  //     console.log(err);
  //   })
  // } 


  // // REMOVE ITEM FROM CART

  // ctrl.removeItem = (id) => {
  //   CartService.removeItem(id)
  //   .then( (data) => {
  //     ctrl.cartItems = data;
  //     ctrl.getItems();
  //   })
  //   .catch( (err) => {
  //     console.log(err);
  //   })
  // }

  
  // // ADD ITEM TO CART

  // ctrl.addItem = (addProduct, addPrice, addQuantity) => {
    
  //   let itemToAdd = {
  //     product: addProduct,
  //     price: addPrice,
  //     quantity: addQuantity,
  //   } 

  //   CartService.addItem(itemToAdd)
  //   .then( (data) => {
  //     ctrl.cartItems = data;
  //     ctrl.getItems();
  //     ctrl.add_product = '';
  //     ctrl.add_price = '';
  //     ctrl.add_quantity = '';
  //   })
  //   .catch( (err) => {
  //     console.log(err);
  //   })

  // }

  
  // // UPDATE ITEM QUANTITY IN CART

  // ctrl.updateItem = (addQuantity, id) => {
    
  //   let itemToUpdate = {
  //     quantity: addQuantity,
  //   } 

  //   CartService.updateItem(itemToUpdate, id)
  //   .then( (data) => {
  //     ctrl.cartItems = data;
  //     ctrl.getItems();
  //   })
  //   .catch( (err) => {
  //     console.log(err);
  //   })

  // }


  // ctrl.getItems();



// ************************************************
// Shopping Cart API
// ************************************************

let shoppingCart = (function() {
// =============================
// Private methods and propeties
// =============================
cart = [];

// Constructor
function Item(product, price, count) {
  this.product = product;
  this.price = price;
  this.count = count;
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
obj.addItemToCart = function(product, price, count) {
  for(let item in cart) {
    if(cart[item].product === product) {
      cart[item].count ++;
      saveCart();
      return;
    }
  }
  let item = new Item(product, price, count);
  cart.push(item);
  saveCart();
}
// Set count from item
obj.setCountForItem = function(product, count) {
  for(let i in cart) {
    if (cart[i].product === product) {
      cart[i].count = count;
      break;
    }
  }
};
// Remove item from cart
obj.removeItemFromCart = function(product) {
    for(let item in cart) {
      if(cart[item].product === product) {
        cart[item].count --;
        if(cart[item].count === 0) {
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

// Count cart 
obj.totalCount = function() {
  let totalCount = 0;
  for(let item in cart) {
    totalCount += cart[item].count;
  }
  return totalCount;
}

// Total cart
obj.totalCart = function() {
  let totalCart = 0;
  for(let item in cart) {
    totalCart += cart[item].price * cart[item].count;
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
    itemCopy.total = Number(item.price * item.count).toFixed(2);
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
// countCart : Function
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
    + "<input type='number' class='item-count form-control' data-product='" + cartArray[i].product + "' value='" + cartArray[i].count + "'>"
    + "<button class='plus-item btn btn-primary input-group-addon' data-product=" + cartArray[i].product + ">+</button></div></td>"
    + "<td><button class='delete-item btn btn-danger' data-product=" + cartArray[i].product + ">X</button></td>"
    + " = " 
    + "<td>" + cartArray[i].total + "</td>" 
    +  "</tr>";
}
$('.show-cart').html(output);
$('.total-cart').html(shoppingCart.totalCart());
$('.total-count').html(shoppingCart.totalCount());
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

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
 let product = $(this).data('product');
 let count = Number($(this).val());
shoppingCart.setCountForItem(product, count);
displayCart();
});

displayCart();

}

angular.module("CartApp")
.component('cartList', {
  controller: ItemList,
  template: `
  

  
  <!-- Main -->
  <div class="container">
      <div class="row text-center">

      <div class="col">
      <div class="card" style="width: 20rem;">
<img class="card-img-top" src="imgs/catfood.jpg" alt="Cat Food">
<div class="card-block">
  <h4 class="card-title">Cat Food</h4>
  <p class="card-text">Price: $5.00</p>
  <a href="#" data-product="Cat-Food" data-price="5.00" class="add-to-cart btn btn-primary">Add to cart</a>
</div>
</div>
    </div>


    <div class="col">
      <div class="card" style="width: 20rem;">
<img class="card-img-top" src="imgs/dogfood.jpg" alt="Dog Food">
<div class="card-block">
  <h4 class="card-title">Dog Food</h4>
  <p class="card-text">Price: $5.00</p>
  <a href="#" data-product="Dog-Food" data-price="5.00" class="add-to-cart btn btn-primary">Add to cart</a>
</div>
</div>
    </div>


    <div class="col">
    <div class="card" style="width: 20rem;">
<img class="card-img-top" src="imgs/birdfood.jpg" alt="Bird Food">
<div class="card-block">
<h4 class="card-title">Bird Food</h4>
<p class="card-text">Price: $10.00</p>
<a href="#" data-product="Bird-Food" data-price="10.00" class="add-to-cart btn btn-primary">Add to cart</a>
</div>
</div>
  </div>



  <div class="col">
  <div class="card" style="width: 20rem;">
<img class="card-img-top" src="imgs/fishfood.jpg" alt="Card image cap">
<div class="card-block">
<h4 class="card-title">Fish Food</h4>
<p class="card-text">Price: $1.00</p>
<a href="#" data-product="Fish-Food" data-price="1.00" class="add-to-cart btn btn-primary">Add to cart</a>
</div>
</div>
</div>



<div class="col">
<div class="card" style="width: 20rem;">
<img class="card-img-top" src="imgs/turtlefood.jpg" alt="Card image cap">
<div class="card-block">
<h4 class="card-title">Turtle Food</h4>
<p class="card-text">Price: $4.00</p>
<a href="#" data-product="Turtle-Food" data-price="4.00" class="add-to-cart btn btn-primary">Add to cart</a>
</div>
</div>
</div>













       <!-- ng-repeat is preventing the item from being added to cart -->

      <!-- <div class="card-deck text-center" id="container">
        <div ng-repeat="item in $ctrl.cartData" class="card">
          <img class="card-img-top" src="catfood.jpg" alt="{{item.product}}">
          <div class="card-body">
            <h5 class="card-title">{{item.product}}</h5>
            <p class="card-text"><small class="text-muted">Price: {{item.price}}</small></p>
            <a href="#" data-product="Lemon" data-price="5" class="add-to-cart btn btn-primary">Add to cart</a>
            </div> -->



      </div>
  </div>

 
  `
})