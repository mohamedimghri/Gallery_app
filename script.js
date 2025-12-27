// Exemple de création du modal 
const gal = document.getElementById('gallery')
const modal = document.createElement('div'); 
modal.className = 'modal'; 
modal.innerHTML = ` 
<button class="modal-close">&times;</button> 
<button class="modal-nav modal-prev">&larr;</button> 
<button class="modal-nav modal-next">&rarr;</button> 
<div class="modal-content"> 
<img src="" alt="" id="modalImage"> 
</div> 
<div class="modal-counter" id="modalCounter"></div> 
`; 
document.body.style.overflow = "";
document.body.appendChild(modal); 

document.querySelector(".modal-close").addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
});

document.querySelector(".modal-nav.modal-prev").addEventListener("click", () => {
    Gallery.navigate(-1);
});

document.querySelector(".modal-nav.modal-next").addEventListener("click", () => {
    Gallery.navigate(1);
});
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
    
});

// create modalcounter
const counterText = document.createElement("h3")
        const modalCounter = document.getElementById("modalCounter")
        modalCounter.appendChild(counterText)

// Méthode 1 : Utiliser une variable intermédiaire 
const Gallery = { 
    images:[],
    currentIndex:0,
        generateImages: function() { 
            for (let i = 1; i <= 20; i++) { 
            this.images.push({ 
            id: i, 
            // Miniature 250x200 pour la galerie 
            thumb: `https://picsum.photos/id/${i}/250/200`, 
            // Grande image 800x600 pour le modal
            url: `https://picsum.photos/id/${i}/800/600`
            }); 
            } 
        },
        renderGallery() {
        const gallery = document.querySelector(".gallery");
        this.images.forEach((img, index) => {
            // creat gallery-item and add images
            const divimg = document.createElement('div')
            divimg.setAttribute("class","gallery-item")
            let image = document.createElement("img");
            image.setAttribute("src",img.thumb);
            divimg.appendChild(image);
            gallery.appendChild(divimg)
            let self = this
            
            image.addEventListener("click",function (){
                self.openModal(index)
            })
            
        });
        





    },
    openModal(index){
        const imageModel = document.getElementById("modalImage")
        this.currentIndex = index;
        let imageSelected = this.images[index]
        imageModel.setAttribute("src",imageSelected.url)
        modal.classList.add("open")

        counterText.innerHTML = this.currentIndex+1+"/20"
        document.body.style.overflow = "hidden";          
    },
handleKeyboard: function (e) {
    if (!modal.classList.contains("open")) return;

    switch (e.key) {
        case "ArrowLeft":
            this.navigate(-1);
            break;

        case "ArrowRight":
            this.navigate(1);
            break;

        case "Escape":
            modal.classList.remove("open");
            document.body.style.overflow = "";
            break;
    }
},


 
attachKeyboardListeners() {
    this.boundHandler = this.handleKeyboard.bind(this);
    document.addEventListener("keydown", this.boundHandler);
}
,


navigate: function(direction) { 
this.currentIndex += direction; 
// Gérer le bouclage 
if (this.currentIndex < 0) { 
this.currentIndex = this.images.length - 1; // Aller à la fin 
} else if (this.currentIndex >= this.images.length) { 
this.currentIndex = 0; // Retour au début 
} 
this.openModal(this.currentIndex); 
} 
};



Gallery.generateImages()
Gallery.renderGallery()
Gallery.attachKeyboardListeners()