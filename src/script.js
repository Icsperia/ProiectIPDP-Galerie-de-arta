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
