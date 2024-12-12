let currentimageindex = 0;

const images = ["image1.jpg","image2.jpg"];

function changeimage(){
    currentimageindex = (currentimageindex + 1) % images.length;
    document.getElementById("cube-image").src = images[currentimageindex];
}