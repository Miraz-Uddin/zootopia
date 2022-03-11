// IIFE
(() => {
    
    let productList = [
        {id:1647023693316, name:'Tomato', price:45},
        {id:1647023693326, name:'Fish', price:1150},
        {id:1647023693346, name: 'Soybean Oil', price: 650},
        {id:1647023693356, name: 'Salt', price: 35}
    ];
    
    const productsCollection = document.querySelector('#productsCollection');
    const sortBtnAsc = document.querySelector('#sortBtnAsc');
    const sortBtnDesc = document.querySelector('#sortBtnDesc');
    const sumOfProducts = document.querySelector('#sumOfProducts');
    const resetAll = document.querySelector('#resetAll');
    const productNameInput = document.querySelector('#productNameInput');
    const productPriceInput = document.querySelector('#productPriceInput');
    const productEntryButton = document.querySelector('#productEntryButton');

    productsTableCreate(productList);

    sortBtnAsc.addEventListener('click',function(e){
        e.preventDefault();
        clearProductTable();
        productsTableCreate(productList,'asc');
    });

    sortBtnDesc.addEventListener('click',function(e){
        e.preventDefault();
        clearProductTable();
        productsTableCreate(productList,'desc');
    });

    resetAll.addEventListener('click',function(e){
        e.preventDefault();
        productList.length = 0;
        productsTableCreate(productList);
    });

    productPriceInput.addEventListener('keyup',function(e){
        e.preventDefault();
        checkIntValue(this)
    });

    productEntryButton.addEventListener('click',function(e){
        e.preventDefault();
        insertNewProduct(this);
    });

    function insertNewProduct(obj){
        checkIntValue(obj);
        const name = productNameInput.value.trim();
        const price = productPriceInput.value;
        if(!!name && name.length > 2){
            const productId = Date.now();
            const customProduct = {id:productId,name,price};
            productList.push(customProduct);
            productRowCreate(customProduct);
            clearProductTable();
            productsTableCreate(productList);
            clearProductEntryForm();
        }else{
            obj.style.border = '2px solid red';
        }
    }

    function checkIntValue(obj){
        let valueValue = parseInt(obj.value);
        obj.value = '';
        if(Boolean(valueValue) == true && valueValue >= 0){
            obj.value = valueValue;
            return true;
        }
        return false;
    }

    function clearProductTable(){
        let html_collection = productsCollection.children;
        let arr = [...html_collection].filter(e =>e.classList.contains("product"));
        arr.map(x=>x.remove());
    }

    function clearProductEntryForm(){
        productPriceInput.value = '';
        productNameInput.value = '';
    }

    function productsTableCreate(list,sortBy='desc'){
        if(list.length == 0){
            sumOfProducts.textContent = 0;
            clearProductTable()
        }else{
            if(sortBy=='desc'){
                list.sort((a,b)=>parseInt(a.price)>parseInt(b.price)).forEach(element => {productRowCreate(element)});
            }else{
                list.sort((a,b)=>parseInt(a.price)<parseInt(b.price)).forEach(element => {productRowCreate(element)});
            }
            sumOfProducts.textContent = list.reduce((a,b)=>{return { price : parseInt(a['price']) + parseInt(b['price'])}}).price;
        }
    }

    function productRowCreate(product){
        productsCollection.insertAdjacentHTML('afterbegin',`<tr id="item-${product.id}" class="product">
        <td class="text-center">${product.name}</td><td class="text-end"><div class="clearfix">
        <span class="float-start">BDT.</span><span class="float-end">${product.price}</span>
        </div></td><td class="text-center"><button type="button" style="background: none; border: 0; padding:0">
        <span class="text-danger deleteBtn">বাদ দিন</span></button></td></tr>`);
    }

})();
