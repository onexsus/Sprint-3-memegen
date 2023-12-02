"use strict";



let gElCanvas;
let gCtx;


function onInit() {
  renderGallery()
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  // resizeCanvas();
  window.addEventListener('resize', resizeCanvas)
}




// Gallery
function renderGallery(){
  const elGalllery=document.querySelector('.gallery-continer')
  var strHTML=''
  const gImges=getImges()
  gImges.forEach((obj)=>{
    strHTML+=`<img src="${obj.url}" onclick="onSelectImg(${obj.id})"/>`
  })
  elGalllery.innerHTML=strHTML
}


// Canvas 
function renderMeme(){
  const meme=getGmeme()
  const elImg = new Image()
  elImg.src= getImgMeme()
  elImg.onload =()=>{

  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  const selectedLine=meme.lines[meme.selectedLineIdx]
  drawBorderBoxText(selectedLine)
  meme.lines.forEach(line=>{
    drawText(line)
  })
  }
}


function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function onSelectImg(imgId) {
  const elGallleryPage=document.querySelector('.meme-gallery-page')
  elGallleryPage.classList.add('hide')
  const elMemegen =document.querySelector('.meme-editor-page')
  elMemegen.classList.remove('hide')
  resizeCanvas();
  updateGmeme(imgId,gElCanvas.width/2)
  renderMeme()
  // coverCanvasWithImg()

}

// function coverCanvasWithImg() {
//   const elImg = new Image()
//   elImg.src= getImgMeme()
//   elImg.onload =()=>{

//   gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
//   gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
//   }
// }

// canvas line poss 

function createPos(){
  
}

//  Canvas Panel Text Line

function onAddTxt(txt){
  setText(txt)
  renderMeme()
}

// function onTextLine(ev){
 
// }

function onChangeLine(diff){
  setTextLine(diff)
  renderMeme()
}

function onAddLine(){
  createLine(gElCanvas.width/2, gElCanvas.height/2)
  renderMeme()
}

function onDeleteLine(){

}

// Canvas Panel Text : size align

function onFontSize(diff){
  console.log(diff)

}

function onTextAlign(direction){
 console.log(direction)
}

// Canvas Panel Font :style color 

function onSetFontStyle(font){
  console.log(font)
}

function onSetStrokeStyle(colorStroke){
  console.log(colorStroke)
}
function onSetFillStyle(colorFill){
  console.log(colorFill)
}
// draw on canvas

function drawBorderBoxText(line){
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'transparent'
  gCtx.lineWidth = 3
  var size=line.size
  var widthSize=(line.txt.length*size*0.5+30)
  gCtx.strokeRect(line.lineX-widthSize/2, line.lineY-size/2, widthSize, size)
  gCtx.fillRect(line.lineX-widthSize/2, line.lineY-size/2, widthSize, size)
}


function drawText(line) {
  
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.strokeStyle
  gCtx.fillStyle = line.fillStyle
  gCtx.font = `${line.size}px  ${line.fontStyle}`
  gCtx.textAlign = line.textAlign
  gCtx.textBaseline = 'middle'
  gCtx.fillText(line.txt, line.lineX, line.lineY)
  gCtx.strokeText(line.txt, line.lineX, line.lineY)  
}

// function drawText(text, x, y) {
//   // gCtx.beginPath()
//   console.log(x,y)
//   gCtx.lineWidth = 1.5
//   gCtx.strokeStyle = 'black'
//   gCtx.fillStyle = 'white'
//   gCtx.font = '40px Arial'
//   gCtx.textAlign = 'center'
//   gCtx.textBaseline = 'middle'
//   gCtx.fillText(text, x, y)
//   gCtx.strokeText(text, x, y)   
// }