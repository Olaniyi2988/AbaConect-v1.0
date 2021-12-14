if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}



let carts = document.querySelectorAll('.btn-theme3');
let products = [
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('li span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('li span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('li span').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)




    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem('totalCost', product.price)
    }
}


    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        
    }


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    let productContainer = document.querySelector('.cart-items')
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {

        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-row d-flex">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="./static/img/${item.tag}" width="100" height="100">
                        <span class="cart-item-title">${item.name}</span>
                    </div>
                    <span class="cart-price cart-column">${item.price}</span>
                    <div class="cart-quantity cart-column">
                    <span>${item.incart}</span>
                        <button class="btn mx-4 btn-danger" type="button">REMOVE</button>
                    </div>
                </div>
            `
        })
        productContainer.innerHTML += `
        <div class="cart-total">
                    <strong class="cart-total-title">Total</strong>
                    <span class="cart-total-price">$${cartCost}</span>
                </div>

        `
    }
}
onLoadCartNumbers();
displayCart();