// IIFE
(() => {
    
    const productEntryButton = document.querySelector('#productEntryButton');
    const productNameInput = document.querySelector('#productNameInput');
    const productPriceInput = document.querySelector('#productPriceInput');
    const messageDisplay = document.querySelector('#messageDisplay');

    productEntryButton.addEventListener('click', e => {
        e.preventDefault();
        // Receiving Inputs
        const { productNameEntry, productPriceEntry } = receiveInputs();

        // Validate Inputs
        let error = validateInputs(productNameEntry, productPriceEntry);

        if(error){
            showErrorMessage('Invalid Input');
        }else{
            showSuccessMessage('Success !!!');
        }
    });

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

})();

/**
 * Steps:
 * 1) Receive Inputs
 * 1) Validate Inputs
*/
