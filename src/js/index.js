let product = [];
const displayProduct = document.querySelector(".display__products");


function renderProduct(){

        let filterProduct = [...product]

        filterProduct.map((item, i)=>{
            let productItem = document.querySelector('.models .product__item').cloneNode(true);
            
            productItem.querySelector('.product__img').src = item.image;
            productItem.querySelector('.product__name').innerHTML = item.name;
            productItem.querySelector('.product__price').innerHTML = `R$ ${item.price.toFixed(2)}`;
            productItem.querySelector('.product__parcel').innerHTML = `até ${item.parcelamento[0]}X de R$ ${item.parcelamento[1]}`;

            displayProduct.append(productItem);
        })
}


let p = new Promise((resolve, reject) => {
    fetch('http://localhost:5000/products')
    .then((response) => response.json())
    .then((data) => {
        product = data;
        resolve();
});})

p.then((resp) =>{ 
    renderProduct();
})
















document.querySelector(".filter__link").addEventListener("click", function(e){

    el = e.target;
    el.style.display="none";
    cores = document.querySelectorAll('ul.filter__color .filter__list:nth-last-child(-n + 5)');
    cores.forEach(cores => {cores.style.display= "flex";})

});


document.querySelectorAll(".accordion").forEach(e => e.addEventListener("click", function(el){

    if (window.innerWidth <= 800) {
        var panel = this.nextElementSibling;
        
        if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
     }else{
        panel.style.display = "block";
     }
}))

document.querySelectorAll(".btn_aside").forEach(e => e.addEventListener("click", function(el){

    if (e.classList.contains("aside__filter")){

        document.querySelector(".filtersgroup").classList.add("active");
    }else{
        document.querySelector(".sort").classList.add("active");
    }
}))

document.querySelectorAll(".close").forEach(e => e.addEventListener("click", function(el){

    e.closest("aside").classList.remove("active");
}))






