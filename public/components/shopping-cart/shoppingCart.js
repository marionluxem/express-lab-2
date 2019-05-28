function ShoppingCart (CartService) {

    const ctrl = this;
}

angular.module("CartApp")
.component('shoppingCart', {
    controller: ShoppingCart,
    template: `
    

    <!-- Modal -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <table class="show-cart table">                
             </table>
             <div class="modal-total">Total price: $<span class="total-cart"></span></div>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <!-- <button type="button" class="btn btn-primary">Order now</button> -->
             <button class="clear-cart btn btn-danger">Clear Cart</button>
           </div>
         </div>
       </div>
     </div>  

    
   
    `
})