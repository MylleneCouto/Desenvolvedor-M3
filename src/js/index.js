let product = [];
let cartLenght = 0;
let filterProduct;
const filterColor = document.querySelectorAll(".color__item");
const filterSize = document.querySelectorAll(".size__item");
const filterPrice = document.querySelectorAll(".price__item");
const displayProduct = document.querySelector(".display__products");
let itemPerload = ((window.innerWidth > 900) ? 9 : 4)
let itemsDisplayed;

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

    criaItens();

}

function cleanFilter(filter) {

    if (filter == "color") {
        filterColor.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })

    } else if (filter == "size") {
        filterSize.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })

    } else if (filter == "price") {
        filterPrice.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })
    } else {
        filterColor.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })
        filterSize.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })
        filterPrice.forEach((element, i) => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        })
        renderProduct();
    }
}

function criaItens() {

    itemsDisplayed = 0;

    for (let i in filterProduct) {

        if (i >= itemPerload) {
            break;
        } else {
            itemsDisplayed += 1
            let productItem = document.querySelector('.models .product__item').cloneNode(true);

            productItem.querySelector('.product__img').src = filterProduct[i].image;
            productItem.querySelector('.product__name').innerHTML = filterProduct[i].name;
            productItem.querySelector('.product__price').innerHTML = `R$ ${filterProduct[i].price.toFixed(2)}`;
            productItem.querySelector('.product__parcel').innerHTML = `até ${filterProduct[i].parcelamento[0]}X de R$ ${filterProduct[i].parcelamento[1]}`;

            displayProduct.append(productItem);
        }
    }

    if (itemsDisplayed >= filterProduct.length) {
        document.querySelector(".load").style.display = "none";
    } else {
        document.querySelector(".load").style.display = "flex";
        filterProduct = filterProduct.slice(itemPerload);
    }

    document.querySelectorAll(".product__btn").forEach(e => e.addEventListener("click", el => {
        cartLenght += 1
        let cartnumber = document.querySelector(".cart__number");
        cartnumber.innerText = cartLenght;
        cartnumber.style.display = "block";
    }))
}

document.querySelectorAll(".sort_option").forEach(e => e.addEventListener("click", el => {

    if (e.classList.contains("lowPrice")) {
        product.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    } else if (e.classList.contains("highPrice")) {
        product.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
    } else {
        product.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    renderProduct()

}))

document.querySelectorAll(".filter__checkbox").forEach(e => e.addEventListener("click", el => {

    if (e.classList.contains("active")) {
        e.classList.remove("active");

    } else {

        if (e.classList.contains("color__item")) {
            cleanFilter("color");
        } else if (e.classList.contains("size__item")) {
            cleanFilter("size");
        } else {
            cleanFilter("price");
        }
        e.classList.add("active");
    }

    if (window.innerWidth > 900) {
        renderProduct();
    }
}))

document.querySelector(".filter__link").addEventListener("click", e => {

    e.target.style.display = "none";
    cores = document.querySelectorAll('ul.filter__color .filter__list:nth-last-child(-n + 5)');
    cores.forEach(cores => { cores.style.display = "flex"; })
});

document.querySelectorAll(".accordion").forEach(e => e.addEventListener("click", el => {

    let panel = e.nextElementSibling;

    if (window.innerWidth <= 900) {
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    } else {
        panel.style.display = "block";
    }
}))

document.querySelectorAll(".btn_aside").forEach(e => e.addEventListener("click", el => (e.classList.contains("aside__filter")) ? document.querySelector(".filtersgroup").classList.add("active") : document.querySelector(".sort").classList.add("active")))
document.querySelectorAll(".close").forEach(e => e.addEventListener("click", e => e.target.closest("aside").classList.remove("active")))
document.querySelector(".load__btn").addEventListener("click", criaItens)
document.querySelector(".btn_clean").addEventListener("click", cleanFilter);
document.querySelector(".btn_apply").addEventListener("click", renderProduct);


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



