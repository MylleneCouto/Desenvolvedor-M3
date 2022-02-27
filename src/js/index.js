let product = [];
let cartLenght = 0;
let filterProduct;
let filterColor = document.querySelectorAll(".color__item");
let filterSize = document.querySelectorAll(".size__item");
let filterPrice = document.querySelectorAll(".price__item");
const displayProduct = document.querySelector(".display__products");


function renderProduct() {


    filterProduct = [];
    displayProduct.innerHTML = '';

    filterProduct = [...product]

    filterColor.forEach((element, i) => {
        if (element.classList.contains("active")) {
            filterProduct = filterProduct.filter(function (el) {
                return el.color == element.value;
            });
        }
    })

    filterSize.forEach((element, i) => {
        if (element.classList.contains("active")) {
            filterProduct = filterProduct.filter(function (el) {
                return el.size.includes(element.innerText);
            });
        }
    })

    filterPrice.forEach((element, i) => {
        if (element.classList.contains("active")) {
            filterProduct = filterProduct.filter(function (el) {
                return el.price >= element.getAttribute("data-min") && el.price <= element.getAttribute("data-max");
            });
        }
    })

    filterProduct.map((item, i) => {
        let productItem = document.querySelector('.models .product__item').cloneNode(true);

        productItem.querySelector('.product__img').src = item.image;
        productItem.querySelector('.product__name').innerHTML = item.name;
        productItem.querySelector('.product__price').innerHTML = `R$ ${item.price.toFixed(2)}`;
        productItem.querySelector('.product__parcel').innerHTML = `até ${item.parcelamento[0]}X de R$ ${item.parcelamento[1]}`;

        displayProduct.append(productItem);
    })

    document.querySelectorAll(".product__btn").forEach(e => e.addEventListener("click", function (el) {
        cartLenght += 1
        let cartnumber = document.querySelector(".cart__number")
        cartnumber.innerText = cartLenght;
        cartnumber.style.display = "block";
    }))
}


let p = new Promise((resolve, reject) => {
    fetch('http://localhost:5000/products')
        .then((response) => response.json())
        .then((data) => {
            product = data;
            resolve();
        });
})

p.then((resp) => {
    renderProduct();
})





document.querySelectorAll(".sort_option").forEach(e => e.addEventListener("click", function (el) {

    el = el.target

    if (el.classList.contains("lowPrice")) {

        product.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));

    } else if (el.classList.contains("highPrice")) {

        product.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));

    } else {
        product.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(product)
    }
    renderProduct()

}))


document.querySelectorAll(".filter__checkbox").forEach(e => e.addEventListener("click", function (el) {

    el = el.target

    if (el.classList.contains("active")) {
        el.classList.remove("active");

    } else {

        if (el.classList.contains("color__item")) {

            filterColor.forEach((element, i) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });

        } else if (el.classList.contains("size__item")) {

            filterSize.forEach((element, i) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        } else {

            filterPrice.forEach((element, i) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        }

        el.classList.add("active");
    }

    renderProduct();
}))


document.querySelector(".filter__link").addEventListener("click", function (e) {

    el = e.target;
    el.style.display = "none";
    cores = document.querySelectorAll('ul.filter__color .filter__list:nth-last-child(-n + 5)');
    cores.forEach(cores => { cores.style.display = "flex"; })

});


document.querySelectorAll(".accordion").forEach(e => e.addEventListener("click", function (el) {

    if (window.innerWidth <= 800) {
        var panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    } else {
        panel.style.display = "block";
    }
}))

document.querySelectorAll(".btn_aside").forEach(e => e.addEventListener("click", function (el) {

    if (e.classList.contains("aside__filter")) {

        document.querySelector(".filtersgroup").classList.add("active");
    } else {
        document.querySelector(".sort").classList.add("active");
    }
}))

document.querySelectorAll(".close").forEach(e => e.addEventListener("click", function (el) {

    e.closest("aside").classList.remove("active");
}))






