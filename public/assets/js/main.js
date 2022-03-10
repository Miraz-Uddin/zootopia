// IIFE
(() => {
    
    const productEntryButton = document.querySelector('#productEntryButton');
    const productNameInput = document.querySelector('#productNameInput');
    const productPriceInput = document.querySelector('#productPriceInput');
    const messageDisplay = document.querySelector('#messageDisplay');
    const productsCollection = document.querySelector('#productsCollection');

    let products = [
        {
            id: 1,
            name: 'Potato',
            price: 50
        },
        {
            id: 2,
            name: 'Soyabin Oil',
            price: 500
        },
        {
            id: 3,
            name: 'Watermelon',
            price: 789
        }
    ];

    productEntryButton.addEventListener('click', e => {
        e.preventDefault();
        // Receiving Inputs
        const { productNameEntry, productPriceEntry } = receiveInputs();

        // Validate Inputs
        let error = validateInputs(productNameEntry, productPriceEntry);

        if(error){
            showErrorMessage('Invalid Input');
        }else{
            products.push({
                id: products.length+1,
                name: productNameEntry,
                price: productPriceEntry
            });
            console.log(products);
            resetInput();
            addItemToFrontend(productNameEntry, productPriceEntry);
            showSuccessMessage('Success !!!');
        }
    });

    productsCollection.addEventListener('click',e=>{
        e.preventDefault();
        if(e.target.classList.contains('deleteBtn')){
            console.log('delete button selected');
        }
    });

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

    function addItemToFrontend(name, price){
        const item = `
            <tr id="item-1">
                <td class="text-center">${name}</td>
                <td class="text-end">BDT. ${price}</td>
                <td class="text-center"><button type="button" style="background: none; border: 0; padding:0">
                <i class="fa fa-trash text-danger deleteBtn"></i></button></td>
            </tr>
        `;
        productsCollection.insertAdjacentHTML('beforeend',item);
    }

})();

/**
 * Steps:
 * 1) Receive Inputs
 * 1) Validate Inputs
*/
