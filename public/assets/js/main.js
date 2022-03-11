// IIFE
(() => {
    
    let productList = [
        {
            id:1,
            name: 'Tomato',
            price: 130
        },
        {
            id:2,
            name: 'Fish',
            price: 1500
        },
        {
            id:3,
            name: 'Chicken',
            price: 600
        },
        {
            id:4,
            name: 'Soyabin Oild',
            price: 700
        },
        {
            id:5,
            name: 'Salt',
            price: 70
        }
    ];
    

    const productsCollection = document.querySelector('#productsCollection');
    const sortBtnAsc = document.querySelector('#sortBtnAsc');
    const sortBtnDesc = document.querySelector('#sortBtnDesc');
    const sumOfProducts = document.querySelector('#sumOfProducts');
    const resetAll = document.querySelector('#resetAll');
    productsTableCreate(productList);

    sortBtnAsc.addEventListener('click',e=>{
        e.preventDefault();
        clearProductTable();
        productsTableCreate(productList,'asc');
        console.log(productList);
    });

    sortBtnDesc.addEventListener('click',e=>{
        e.preventDefault();
        clearProductTable();
        productsTableCreate(productList,'desc');
        console.log(productList);
    });

    resetAll.addEventListener('click',e=>{
        e.preventDefault();
        productList.length = 0;
        productsTableCreate(productList);
    });

    function clearProductTable(){
        let html_collection = productsCollection.children;
        let arr = [...html_collection].filter(e =>e.classList.contains("product"));
        arr.map(x=>x.remove());
    }

    function productsTableCreate(list,sortBy='desc'){
        if(list.length == 0){
            sumOfProducts.textContent = 0;
            clearProductTable()
        }else{
            if(sortBy=='desc'){
                list.sort((a,b)=>{
                    return parseInt(a.price)>parseInt(b.price);
                }).forEach(element => {
                    productRowCreate(element);
                });
            }else{
                list.sort((a,b)=>{
                    return parseInt(a.price)<parseInt(b.price);
                }).forEach(element => {
                    productRowCreate(element);
                });
            }
            sumOfProducts.textContent = list.reduce((a,b)=>{
                return { price : parseInt(a['price']) + parseInt(b['price'])};
            }).price;
        }
        
        
    }

    function productRowCreate(product){
        const item = `
            <tr id="item-${product.id}" class="product">
                <td class="text-center">${product.name}</td>
                <td class="text-end">
                    <div class="clearfix">
                        <span class="float-start">BDT.</span>
                        <span class="float-end">${product.price}</span>
                    </div>
                </td>
                <td class="text-center">
                <button type="button" style="background: none; border: 0; padding:0">
                    <span class="text-danger deleteBtn">বাদ দিন</span>
                </button></td>
            </tr>
        `;
        productsCollection.insertAdjacentHTML('afterbegin',item);
    }

})();
