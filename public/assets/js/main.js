// IIFE
(() => {
    
    const productEntryButton = document.querySelector('#productEntryButton');
    const productNameInput = document.querySelector('#productNameInput');
    const productPriceInput = document.querySelector('#productPriceInput');
    const messageDisplay = document.querySelector('#messageDisplay');
    const productsCollection = document.querySelector('#productsCollection');

    let products = [];

    productEntryButton.addEventListener('click', e => {
        e.preventDefault();
        // Receiving Inputs
        const { productNameEntry, productPriceEntry } = receiveInputs();

        // Validate Inputs
        let error = validateInputs(productNameEntry, productPriceEntry);

        if(error){
            showErrorMessage('Invalid Input');
        }else{
            // Resetting inputs
            resetInput();

            // Create & store & a Product
            const getId = generateAProduct(productNameEntry,productPriceEntry);
            addItemToFrontend(getId, productNameEntry, productPriceEntry);

            // Show a Success Message if 'Succeed'
            showSuccessMessage('Success !!!');
        }
        console.log(products);
    });

    function generateAProduct(name, price){
        const id = products.length+1;
        products.push({
            id: id,
            name: name,
            price: price
        });
        return id;
    }

    productsCollection.addEventListener('click',e=>{
        e.preventDefault();
        if(e.target.classList.contains('deleteBtn')){
            const removableId = getremovableIdItem(e.target);
            removeItemFromUI(removableId);
            removeItemFromStorage(removableId);
        }
        console.log(products);
    });

    function removeItemFromUI(itemIdToRemove){
        document.querySelector(`#item-${itemIdToRemove}`).remove();
    }
    
    function removeItemFromStorage(itemIdToRemove){
        const productListArray = products.filter(x=>x.id !== itemIdToRemove);
        products = productListArray;
    }

    function getremovableIdItem(obj){
        return obj.parentElement.parentElement.parentElement.id.split('-')[1];
    }

    function resetInput(){
        productNameInput.value = '';
        productPriceInput.value = '';
    }

    function receiveInputs(){
        const productNameEntry =  productNameInput.value;
        const productPriceEntry =  productPriceInput.value;
        return { productNameEntry, productPriceEntry }
    }

    function validateInputs(name, price){
        let isError = false;
        if((!name || name.length<3) || (!price || Number(price) <= 0) ) isError = true;
        return isError;
    }

    function showErrorMessage(msg){
        const messageElement = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        messageDisplay.innerHTML = '';
        messageDisplay.insertAdjacentHTML('afterbegin',messageElement);
    }

    function showSuccessMessage(msg){
        const messageElement = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        messageDisplay.innerHTML = '';
        messageDisplay.insertAdjacentHTML('afterbegin',messageElement);
    }

    function addItemToFrontend(id, name, price){
        const item = `
            <tr id="item-${id}">
                <td class="text-center">${name}</td>
                <td class="text-end">BDT. ${price}</td>
                <td class="text-center"><button type="button" style="background: none; border: 0; padding:0">
                <i class="fa fa-trash text-danger deleteBtn"></i></button></td>
            </tr>
        `;
        productsCollection.insertAdjacentHTML('beforeend',item);
    }

    console.log(products);

})();
