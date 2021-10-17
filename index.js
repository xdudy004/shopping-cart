// Make sure page is downloaded

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}





function ready(){
    // Select buttons class 
    const buttonRemoveCarts = document.getElementsByClassName("btn-danger");
    console.log(buttonRemoveCarts);
    // Make for each button with class 'danger' method 'remove' parent elements.
    for(let i = 0; i < buttonRemoveCarts.length; i++){
        let button = buttonRemoveCarts[i];
        button.addEventListener('click', removeCartItem)
    }


    // Change price by the amount of input quantity
    let quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


    // Add product to shopping list
    let buttonAddToCarts = document.getElementsByClassName("btn-primary")
    console.log(buttonAddToCarts)
    for(let i = 0; i < buttonAddToCarts.length; i++){
        let button = buttonAddToCarts[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName("btn-success")[0].addEventListener('click', purchaseClicked)
}



// Purchse 
function purchaseClicked(){
    alert('Thank you for you purchase!')

    let cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


// Function for adding items to Cart Shopping List
function addToCartClicked(event){
    let button = event.target
    // Add information from card to Cart Shopping List
    let productItem = button.parentElement.parentElement
    // console.log(productItem)
    let image = productItem.getElementsByClassName("card-img-top")[0].src
    console.log(image)
    let title = productItem.getElementsByClassName("card-title")[0].innerText
    console.log(title)
    let price = productItem.getElementsByClassName("card-price")[0].innerText
    console.log(price)
    addItemToCart(image, title, price)
    updateCartTotal()
}


function addItemToCart(image, title, price){
    let cartRow = document.createElement("div")
    // cartRow.innerHTML = title

    // Add style same from particular class
    cartRow.classList.add("cart-row")

    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemsTitle = cartItems.getElementsByClassName("cart-item-title")
    for(let i = 0; i < cartItemsTitle.length; i++){
        if(cartItemsTitle[i].innerText == title){
            alert('This product is already added to the cart!')
            return
        }
    }

    let cartRowContents = `
        <div class="cart-item col-4 cart-column">
            <img class="cart-item-image" src="${image}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price col-4 cart-column">${price}</span>
        <div class="cart-quantity col-4 cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1" max="20" step="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    // Add remove function for Items on List
    let buttonRemoveProduct = cartRow.getElementsByClassName("btn-danger")[0]
    buttonRemoveProduct.addEventListener('click', removeCartItem)
    let cartInput = cartRow.getElementsByClassName("cart-quantity-input")[0]
    cartInput.addEventListener('change', quantityChanged)
}


function quantityChanged(event){
    // Target of event
    let input = event.target
    // Checked if value not a number or value less or equal to zero
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1
    }
    updateCartTotal()
}


function removeCartItem(event){
    // Target of event
    let buttonClicked = event.target

    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}


function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    console.log(cartItemContainer);
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    console.log(cartRows);
    let total = 0
    for (let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceEl = cartRow.getElementsByClassName("cart-price")[0]
        let quantityEl = cartRow.getElementsByClassName("cart-quantity-input")[0]
        console.log(priceEl, quantityEl)
        let price = parseFloat(priceEl.innerText.replace('$', ''))
        let quantity = quantityEl.value
        total = total + (price * quantity)
        console.log(total)  
    }

    // Make the price always with two decimal 
    total = Math.round(total * 100) / 100

    document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
    // console.log(cartTotal[0].innerText)
    
}



