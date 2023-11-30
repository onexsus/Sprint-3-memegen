"use strict";



let gElCanvas;
let gCtx;

function onInit() {
  renderGallery()
  // gElCanvas = document.getElementById("canvas");
  // gCtx = gElCanvas.getContext("2d");
  // resizeCanvas();
}
function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function renderGallery(){
  const elGalllery=document.querySelector('.gallery-continer')
  var strHTML=''
  const gImges=getImges()
  // gImges.forEach((obj)=>{
  //   strHTML+=`<img src="${obj.url}" onclick="onSelectImg(this)"/>`
  //   console.log(obj.url)
  // })
  for(let i=0;i<gImges.length;i++){
    strHTML+=`<img src="${gImges[i].url}" onclick="onSelectImg(this)"/>`
    console.log(gImges[i].url)
  }
  console.log(strHTML)
  elGalllery.innerHTML=strHTML
}

function onSelectImg(elImg) {
  coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}