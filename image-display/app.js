var currentImageIndex = 0;
var mainImage = document.getElementsByClassName('main-image');

var images = document.getElementsByClassName('img-small');
for (var i = 0; i < images.length; i++) {
    var element = images[i];
    element.onclick = function(){
    	this.classList.toggle('selected-image');
    	images[currentImageIndex].classList.toggle('selected-image');
    	currentImageIndex = this.dataset.id;
		mainImage[0].src=images[currentImageIndex].src
    }
}

var buttons = document.getElementsByClassName('btn');
for (var i = 0; i < buttons.length; i++) {
	var element = buttons[i];
    element.onclick = function(){
    	images[currentImageIndex].classList.toggle('selected-image');
    	if (this.id==='left-button'){
    		currentImageIndex--
    		if (currentImageIndex===-1){
    			currentImageIndex=images.length-1
    		}
    	} else {
    		currentImageIndex++
    		if (currentImageIndex===images.length){
    			currentImageIndex=0
    		}
    	}
    	images[currentImageIndex].classList.toggle('selected-image');
    	mainImage[0].src=images[currentImageIndex].src;
	}
}

