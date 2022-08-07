const cart = ()=>{
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');
    const modalBody = document.querySelector('.modal-body');
    const buttonSend = modalCart.querySelector('.button-primary');
    const clearCart = modalCart.querySelector('.clear-cart');


    const resetCart = () =>{
        modalBody.innerHTML = ' ';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
    }

    const incrementCount = (id)=>{
        const cartArray = JSON.parse(localStorage.getItem('cart'));
        cartArray.map((item) =>{
            if(item.id === id){
                item.count++;
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray);

    }
    const decrementCount = (id)=>{
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map((item) =>{
            if(item.id === id){
                if(item.count >0){
                       item.count--; 
                }else{
                    item.count =0;
                }
            
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray);
    }

    const renderItems = (data)=>{
        modalBody.innerHTML ='';
        data.forEach(cartItem =>{
            console.log(cartItem);
            const cartElem = document.createElement('div');
            cartElem.classList.add('food-row');
            cartElem.innerHTML = `
            <span class="food-name">${cartItem.name}</span>
            <strong class="food-price">${cartItem.price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button btn-dec">-</button>
                <span class="counter">${cartItem.count}</span>
                <button class="counter-button btn-inc">+</button>
            </div>
            `
            cartElem.querySelector('.btn-dec').addEventListener('click',()=>{
                decrementCount(cartItem.id)
            }) 
            cartElem.querySelector('.btn-inc').addEventListener('click',()=>{
                incrementCount(cartItem.id)
            }) 
            modalBody.append(cartElem);
        })
    }


buttonSend.addEventListener('click', ()=>{
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: cartArray    
    })
    .then(response=>{
        if(response.ok){
            console.log('ok');
            resetCart();
        }
    })
})

    buttonCart.addEventListener('click', ()=>{

        if(localStorage.getItem('cart')){
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }
        modalCart.classList.add('is-open');
    })
    close.addEventListener('click', ()=>{
        modalCart.classList.remove('is-open');
    })
    clearCart.addEventListener('click', resetCart);

    
}
cart();

