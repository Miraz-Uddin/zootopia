// IIFE
(() => {
    
    let productList = [
        {id:1647023693316, name:'Egg', price:110},
        {id:1647023693326, name:'Potato', price:200},
        {id:1647023693346, name: 'Soybean Oil', price: 650},
        {id:1647023693356, name: 'Salt', price: 35}
    ];
    
    const productsCollection = document.querySelector('#productsCollection');
    const sortBtnAsc = document.querySelector('#sortBtnAsc');
    const sortBtnDesc = document.querySelector('#sortBtnDesc');
    const sumOfProducts = document.querySelector('#sumOfProducts');
    const nameSearchInput = document.querySelector('#nameSearchInput');
    const resetAll = document.querySelector('#resetAll');
    const productNameInput = document.querySelector('#productNameInput');
    const productPriceInput = document.querySelector('#productPriceInput');
    const productEntryButton = document.querySelector('#productEntryButton');
    const productUpdateButton = document.querySelector('#productUpdateButton');
    const editableProductNameDisplay = document.querySelector('#editableProductNameDisplay');
    const editableProductPriceInput = document.querySelector('#editableProductPriceInput');
    const editableProductNameInput = document.querySelector('#editableProductNameInput');

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

    productUpdateButton.addEventListener('click',function(e){
        e.preventDefault();
        // updateNewProduct(this);
       
        const updateableItemId = getUpdateItemId(e.target)

        if(updateableItemId){

            const name = productNameInput.value.trim();
            const price = productPriceInput.value;
            
            const index = productList.findIndex(object => {
                return object.id == updateableItemId;
            });

            console.log(index);
            const customProduct = {id:updateableItemId,name,price};
            console.log(customProduct);
            
        }else{
            console.log('No item to update');
        }
            
    });

    nameSearchInput.addEventListener('input',function(e){
        e.preventDefault();
        const filteredList = productList.filter(x=>x.name.toLowerCase().includes(this.value.toLowerCase()));
        clearProductTable();
        productsTableCreate(filteredList);
    });

    productsCollection.addEventListener('click',function(e){
        e.preventDefault();
        if(e.target.classList.contains('deleteBtn')){
            const removedId = getItemId(e.target);
            productList.splice(productList.findIndex(object => object.id == removedId), 1);
            clearProductTable();
            productsTableCreate(productList);
        }
        
        if(e.target.classList.contains('editBtn')){
            const editId = getItemId(e.target);
            const editProductObject = productList.find(object => object.id == editId);
            populateEditForm(editProductObject);
            productUpdateButton.parentElement.id=`updatedItemId-${editId}`;
        }

        /**
         * const index = arr.indexOf('a');
                if (indexOf !== -1) {
                arr[index] = 'z';
            }
        */
            
    });

    function populateEditForm(obj){
        editableProductNameDisplay.textContent = obj.name;
        editableProductPriceInput.value = obj.price;
        editableProductNameInput.value = obj.name;
    }

    function getItemId(elem){
        return elem.parentElement.parentElement.parentElement.parentElement.id.split('-')[1];
    }

    function getUpdateItemId(elem){
        return elem.parentElement.id.split('-')[1];
    }

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

    // function updateNewProduct(obj){
    //     checkIntValue(obj);
    //     const name = productNameInput.value.trim();
    //     const price = productPriceInput.value;
    //     if(!!name && name.length > 2){
    //         const productId = Date.now();
    //         const customProduct = {id:productId,name,price};
    //         productList.push(customProduct);
    //         productRowCreate(customProduct);
    //         clearProductTable();
    //         productsTableCreate(productList);
    //         clearProductEntryForm();
    //     }else{
    //         obj.style.border = '2px solid red';
    //     }
    // }

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
        </div></td><td class="text-center d-flex justify-content-evenly">
        <button type="button" style="background: none; border: 0; padding:0"><span class="text-success">
        <i class="fa fa-pencil editBtn"></i></span></button><button type="button" style="background: none; border: 0; padding:0">
        <span class="text-danger"><i class="fa fa-minus-circle deleteBtn"></i></span></button></td></tr>`);
    }

})();
