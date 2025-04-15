function showContent(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case 'about':
            title.innerText = "About Us";
            content.innerText = "Welcome to the About page!";
            break;
        case 'reacts':
            title.innerText = "Reacts";
            content.innerText = "Here are some reactions from our community.";
            break;
        case 'ai':
            title.innerText = "AI Art";
            content.innerText = "Explore amazing AI-generated artwork.";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function arts_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case 'portraits':
            title.innerText = "Pencil Portraits";
            break;
        case 'acrylic':
            title.innerText = "Acrylic Paintings";
            break;
        case 'watercolor':
            title.innerText = "Watercolor Paintings";
            break;
        case 'draw':
            title.innerText = "Drawings";
            break;
        case 'random_draw':
            title.innerText = "Random Drawings";
            break;

        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function artist_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case '1':
            title.innerText = "Artist 1";
            break;
        case '2':
            title.innerText = "Artist 2";
            break;
        case '3':
            title.innerText = "Artist 3";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function account_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case 'log_in':
            title.innerText = "Log in";
            break;
        case 'sing_in':
            title.innerText = "Sign in";
            break;
        case 'condition':
            title.innerText = "Conditions";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

const acrylic_products = [
    {id: 1, name: "Cat", images:["desene\\acrylic\\acrylic_cat.jpg"], price: 99.99},
    {id: 2, name: "River", images:["desene\\acrylic\\acrylic_river2.jpg", "desene\\acrylic\\acrylic_river1.jpg", "desene\\acrylic\\acrylic_river3.jpg",], price: 99.99},
    {id: 3, name: "Cascade", images: ["desene\\acrylic\\acrylic_cascade.jpg", "desene\\acrylic\\acrylic_cascade2.jpg", "desene\\acrylic\\acrylic_cascade3.jpg"], price: 99.99},
    {id: 4, name: "Forest", images: ["desene\\acrylic\\acrylic_forest.jpg", "desene\\acrylic\\acrylic_forest1.jpg", "desene\\acrylic\\acrylic_forest2.jpg"], price: 99.99},
    {id: 5, name: "Cascade", images: ["desene\\acrylic\\acrylic_mountain.jpg", "desene\\acrylic\\acrylic_mountain1.jpg", "desene\\acrylic\\acrylic_mountain2.jpg"], price: 99.99},
    {id: 6, name: "Sunrise", images: ["desene\\acrylic\\acrylic_sunrise.jpg","desene\\acrylic\\acrylic_sunrise1.jpg", "desene\\acrylic\\acrylic_sunrise2.jpg"], price: 99.99},
    {id: 7, name: "Lake", images: ["desene\\acrylic\\acrylic_lake.jpg", "desene\\acrylic\\acrylic_lake1.jpg"], price: 99.99},
    {id: 8, name: "Fire", images: ["desene\\acrylic\\acrylic_fire1.jpg", "desene\\acrylic\\acrylic_fire2.jpg"], price: 99.99},
    {id: 9, name: "Icon", images: ["desene\\acrylic\\acrylic_icon1.jpg", "desene\\acrylic\\acrylic_icon2.jpg"], price: 99.99},

];

const watercolor_products = [
    {id: 10, name: "Cat", images:["desene\\watercolor\\w_cat.jpg", "desene\\watercolor\\w_cat1.jpg"], price: 99.99},
    {id: 11, name: "Dragon", images:["desene\\watercolor\\w_dragon.jpg"], price: 99.99},
    {id: 12, name: "Stark wolf", images:["desene\\watercolor\\w_stark.jpg", "desene\\watercolor\\w_stark1.jpg"], price: 99.99},
    {id: 13, name: "Person", images:["desene\\watercolor\\w_bipolar.jpg"], price: 99.99},
    {id: 14, name: "Wanda", images:["desene\\watercolor\\w_wanda.jpg", "desene\\watercolor\\w_wanda1.jpg"], price: 99.99},
];

const portret_products = [
    {id: 15, name: "Zendaya", images:["desene\\portret\\portret_zendaya2.jpg", "desene\\portret\\portret_zendaya.jpg", "desene\\portret\\portret_zendaya1.jpg"], price: 99.99},
    {id: 16, name: "The witcher", images:["desene\\portret\\portret_witcher1.jpg", "desene\\portret\\portret_witcher.jpg"], price: 99.99},
    {id: 17, name: "Baby", images:["desene\\portret\\portret_bebe.jpg", "desene\\portret\\portret_zendaya1.jpg", "desene\\portret\\portret_bebe2.jpg"], price: 99.99},
    {id: 18, name: "Butterfly", images:["desene\\portret\\portret_butterfly.jpg", "desene\\portret\\portret_butterfly1.jpg"], price: 99.99},
    {id: 19, name: "Children", images:["desene\\portret\\portret_copii.jpg", "desene\\portret\\portret_copii1.jpg"], price: 99.99},
    {id: 20, name: "Rhaenyra", images:["desene\\portret\\portret_hotd.jpg", "desene\\portret\\portret_hotd2.jpg"], price: 99.99},
    {id: 21, name: "Andreea", images:["desene\\portret\\portret_andreea.jpg"], price: 99.99},
    {id: 22, name: "Zendaya Dune", images:["desene\\portret\\portret_dune.jpg"], price: 99.99},
    {id: 23, name: "Cousins", images:["desene\\portret\\portret_ionut.jpg"], price: 99.99},
    {id: 24, name: "Loki", images:["desene\\portret\\portret_loki.jpg", "desene\\portret\\portret_loki1.jpg"], price: 99.99},
    //{id: 25, name: "Wanda", images:[], price: 99.99},
];
const random_products = [
    {id: 28, name: "Eye", images:["desene\\random\\old_eye.jpg"], price: 99.99},
    {id: 26, name: "Carnaval", images:["desene\\random\\carnaval.jpg"], price: 99.99},
    {id: 27, name: "Dune", images:["desene\\random\\dune.jpg"], price: 99.99},
    {id: 29, name: "Flower", images:["desene\\random\\flower.jpg"], price: 99.99},
    {id: 30, name: "Phonecase", images:["desene\\random\\phonecase1.jpg", "desene\\random\\phonecase.jpg"], price: 99.99},
    // {id: 31, name: "Wanda", images:[], price: 99.99},
    // {id: 32, name: "Wanda", images:[], price: 99.99},
];

let cart = [];
let selectedProduct = null;
let currentImageIndex = 0;


function displayProducts(products) {
    var productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(function (product){
        var productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.setAttribute("data-id", product.id);

        var title = document.createElement("h3");
        title.innerText = product.name;

        var price = document.createElement("p");
        price.innerText = "Price: " + product.price + " euro";

        var img = document.createElement("img");
        img.src = product.images[0];
        img.alt = product.name;

        var addButton = document.createElement("button");
        addButton.className = "addCart";
        addButton.innerText = "Add to cart";

        addButton.addEventListener("click", function (event) {
            event.stopPropagation();
            selectedProduct = product;
            addToCart();
        });

        productDiv.appendChild(title);
        productDiv.appendChild(img);
        productDiv.appendChild(price);
        productDiv.appendChild(addButton);
        productList.appendChild(productDiv);

        var imgIndex = 0;
        img.addEventListener("mouseenter", function () {
            imgIndex = 0;
            var interval = setInterval(function () {
                imgIndex = (imgIndex + 1) % product.images.length;
                img.src = product.images[imgIndex];
            }, 1000);

            img.addEventListener("mouseleave", function () {
                clearInterval(interval);
                img.src = product.images[0];
            }, {once: true});
        });

        productDiv.addEventListener("click", function () {
            viewProduct(product.id, product);
        });
    });
}

function viewProduct(id, product) {
    selectedProduct = product;
    currentImageIndex = 0;

    document.getElementById("detailName").textContent = selectedProduct.name;
    document.getElementById("detailImage").src = selectedProduct.images[currentImageIndex];
    document.getElementById("detailPrice").textContent = "Price: " + selectedProduct.price + " euro";

    document.getElementById("productList").style.display = "none";
    document.getElementById("product_details").style.display = "block";

    displayThumbnails();

    // Evităm adăugarea multiplă
    const detailImage = document.getElementById("detailImage");
    detailImage.onclick = function (event) {
        var imageWidth = this.clientWidth;
        var clickPosition = event.offsetX;

        if (clickPosition < imageWidth / 2) {
            prevImage();
        } else {
            nextImage();
        }
    };
}


function prevImage(){
    if(currentImageIndex > 0){
        currentImageIndex --;
        updateMainImage();
    }
}

function nextImage(){
    if(currentImageIndex < selectedProduct.images.length - 1){
        currentImageIndex++;
        updateMainImage();
    }
}

function updateMainImage(){
    document.getElementById("detailImage").src = selectedProduct.images[currentImageIndex];
}

function displayThumbnails(){
    var thumbnailContainer = document.getElementById("thumbnailContainer");
    thumbnailContainer.innerHTML = "";

    selectedProduct.images.forEach(function (img, index){
        var thumb = document.createElement("img");
        thumb.src = img;
        thumb.className = "thumbnail";
        thumb.onclick = function () {changeImage(index);};
        thumbnailContainer.appendChild(thumb);
    });
}

function changeImage(index){
    currentImageIndex = index;
    updateMainImage();
}

function addToCart(){
    cart.push(selectedProduct);
    document.getElementById("cart_count").textContent = cart.length;
    alert("Added to cart");

    document.getElementById("product_details").style.display = "none";
    document.getElementById("productList").style.display = "block";
}

function showCart(){
    var cartItems = cart.map(function (p){ return p.name; }).join(", ");
    alert("Products" + cartItems);
}
