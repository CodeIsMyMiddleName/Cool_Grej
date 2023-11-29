function show_image(src, width, height) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    
    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

show_image("https://www.shutterstock.com/shutterstock/photos/277499918/display_1500/stock-photo-cool-skeleton-heart-a-cool-skeleton-wearing-a-leather-jacket-and-sunglasses-with-a-smoke-in-his-277499918.jpg", 
            300,
            300);

const root = document.getElementById("root");
let x = document.createElement("button");
x.setAttribute("id", "testKnapp")
x.textContent = "Hej"
root.appendChild(x);

var myButton = document.getElementById("testKnapp");
myButton.style.width = "5%";
myButton.style.height = "10%";
myButton.style.position = "absolute";
myButton.style.top = "25%"
myButton.style.left = "25%"


