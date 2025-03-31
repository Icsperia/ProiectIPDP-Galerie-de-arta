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
    {id: 1, name: "Cat", images:["acrylic_cat.jpg", "acrylic_river.jpg"], price: 99.99},
    {id: 2, name: "River", price: 99.99, images:["acrylic_river.jpg"]}
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
        price.innerText ="Price: " + product.price + " euro";

        var img = document.createElement("img");
        img.src = product.images[0];
        img.alt = product.name;

        productDiv.appendChild(title);
        productDiv.appendChild(img);
        productDiv.appendChild(price);
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
    selectedProduct = product.find(function (p) {return p.id === id;});
    currentImageIndex = 0;

    document.getElementById("detailName").textContent = selectedProduct.name;
    document.getElementById("detailImage").src = selectedProduct.images[currentImageIndex];
    document.getElementById("detailPrice").textContent = "Price: " + selectedProduct.price + "euro";

    document.getElementById("productList").style.display = "none";
    document.getElementById("productDiv").style.display = "block";

    displayThumbnails();
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
}

function showCart(){
    var cartItems = cart.map(function (p){ return p.name; }).join(", ");
    alert("Products" + cartItems);
}

document.getElementById("detailImage").addEventListener("click", function(event){
    var imageWidth = this.clientWidth;
    var clickPosition = event.offsetX;

    if(clickPosition < imageWidth/2){
        prevImage();
    }else{
        nextImage();
    }
});
displayProducts(acrylic_products);