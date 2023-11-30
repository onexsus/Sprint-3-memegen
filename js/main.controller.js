"use strict";



let gElCanvas;
let gCtx;

function onInit() {
  renderGallery()
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas)
}




// Gallery
function renderGallery(){
  const elGalllery=document.querySelector('.gallery-continer')
  var strHTML=''
  const gImges=getImges()
  gImges.forEach((obj)=>{
    strHTML+=`<img src="${obj.url}" onclick="onSelectImg(this)"/>`
  })
  elGalllery.innerHTML=strHTML
}


// Canvas 
function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function onSelectImg(elImg) {
  const elGallleryPage=document.querySelector('.meme-gallery-page')
  elGallleryPage.classList.add('hide')
  const elMemegen =document.querySelector('.meme-editor-page')
  elMemegen.classList.remove('hidden')
  coverCanvasWithImg(elImg)

}

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}