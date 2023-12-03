"use strict";



let gElCanvas;
let gCtx;
let gStartPos;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
  renderGallery()
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  addMouseListeners()
  addTouchListeners()

  window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}


// Gallery
function renderGallery(){
  const elGallleryPage=document.querySelector('.meme-gallery-page')
  const elGalllery=document.querySelector('.gallery-continer')
  elGallleryPage.classList.remove('hide')
  const elMemeGalllery=document.querySelector('.memes-gallery-continer')
  elMemeGalllery.classList.add('hide')
  const elMemegen =document.querySelector('.meme-editor-page')
  elMemegen.classList.add('hide')
  var strHTML='<div class="upload-box"><input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" accept="image/*" /></div>'
  const gImges=getSortedImges()
  gImges.forEach((obj)=>{
    strHTML+=`<img src="${obj.url}" onclick="onSelectImg('${obj.url}')"/>`
  })
  elGalllery.innerHTML=strHTML
}


// Canvas 
function renderMeme(){
  const meme=getGmeme()
  const elImg = new Image()
  elImg.src= meme.url
  elImg.onload =()=>{

  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  const selectedLine=meme.lines[meme.selectedLineIdx]
  if(meme.isSelected===true){
    drawBorderBoxText(selectedLine,selectedLine.textAlign)
  }
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

function onSelectImg(imgUrl) {
  const elGallleryPage=document.querySelector('.meme-gallery-page')
  elGallleryPage.classList.add('hide')
  const elMemeGalllery=document.querySelector('.memes-gallery-continer')
  elMemeGalllery.classList.add('hide')
  const elMemegen =document.querySelector('.meme-editor-page')
  elMemegen.classList.remove('hide')
  resizeCanvas();
  updateGmeme(imgUrl,gElCanvas.width/2)
  renderMeme()

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
  setSelcted(true)
  setText(txt)
  renderMeme()
}


function onChangeLine(diff){
  setSelcted(true)
  setTextLine(diff)
  renderMeme()
}

function onAddLine(){
  setSelcted(true)
  createLine(gElCanvas.width/2, gElCanvas.height/2)
  renderMeme()
}

function onDeleteLine(){
  setSelcted(true)
  deleteLine()
  renderMeme()
}

// Canvas Panel Text : size align

function onFontSize(diff){
  setSelcted(true)
  setFontSize(diff)
  renderMeme()

}

function onTextAlign(direction){
  setSelcted(true)
  setTextAlign(direction)
  renderMeme()
}

// Canvas Panel Font :style color 

function onSetFontStyle(font){
  setSelcted(true)
  setFontStyle(font)
  renderMeme()
}

function onSetStrokeStyle(colorStroke){
  setSelcted(true)
  setStrokeStyle(colorStroke)
  renderMeme()
}
function onSetFillStyle(colorFill){
  setSelcted(true)
  setFillStyle(colorFill)
  renderMeme()
}
// draw on canvas

function drawBorderBoxText(line,textAlign){
  var size=line.size
  var widthSize=(line.txt.length*size*0.5+30)
  var startX
  if(textAlign==='center'){
    startX=line.lineX-widthSize/2
  }
  if(textAlign==='right'){
    startX=line.lineX-widthSize
    widthSize*=1.15
  }
  if(textAlign==='left'){
    startX=line.lineX-widthSize*0.15
    widthSize*=1.5
  }
  setLinePosSize(startX,startX+widthSize,line.lineY-size/2,line.lineY+size/2)
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'transparent'
  gCtx.lineWidth = 3
  gCtx.strokeRect(startX, line.lineY-size/2, widthSize, size)
  gCtx.fillRect(startX, line.lineY-size/2, widthSize, size)
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

// Mouse events

// function onMouseSelectLine(ev){

//   const { offsetX, offsetY} = ev
//   const gLines =getGmeme().lines
//   const clickedLine = gLines.find(line => {
//       return offsetX >= line.pos.startX && offsetX <= line.pos.endX
//           && offsetY >= line.pos.startY && offsetY <= line.pos.endY
//   })
//   if (clickedLine) {
//       const lineIdx= gLines.findIndex(line=>line===clickedLine)
//       setSelectedLine(lineIdx)
//       renderMeme()
//   } 
// }

function onDown(ev) {

  const pos = getEvPos(ev)
  // console.log('pos', pos)
  if (!isLineClicked(pos)){
    renderMeme()
    return
  }

  setLineDrag(true)
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'move'
}

function onMove(ev) {
  const currLine=getGmeme()
  const startLineX = currLine.lines[currLine.selectedLineIdx].lineX
  const startLineY= currLine.lines[currLine.selectedLineIdx].lineY
  const  isDrag  = currLine.lines[currLine.selectedLineIdx].isDrag
  if (!isDrag) return
  console.log('Moving the line')

  const pos = getEvPos(ev)
  // Calc the delta, the diff we moved
  const dx = pos.offsetX - startLineX
  const dy = pos.offsetY - startLineY
  moveLine(dx, dy)
  // Save the last pos, we remember where we`ve been and move accordingly
  // updateLinepos(posX,posY)
  // The canvas is render again after every move
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'default'
}

function getEvPos(ev) {

  let pos = {
    offsetX: ev.offsetX,
    offsetY: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
      // Prevent triggering the mouse ev
      ev.preventDefault()
      // Gets the first touch point
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        offsetX: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        offsetY: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
  }
  return pos
}
// UPLOAD IMGE

function onImgInput(ev) {
  loadImageFromInput(ev, onSelectImg)
}
// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  reader.onload = function (event) {
      let img = new Image() 
      img.src = event.target.result 
      img.onload = () => onImageReady(img.src)
  }
  reader.readAsDataURL(ev.target.files[0]) 
}



// URL SHARE FCAEBOOK

function onUploadImg() {

  const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

  function onSuccess(uploadedImgUrl) {

      const url = encodeURIComponent(uploadedImgUrl)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }
  

  doUploadImg(imgDataUrl, onSuccess)
}


function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {

      if (XHR.readyState !== XMLHttpRequest.DONE) return

      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR

      console.log('Got back live url:', url)
      onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}



// -----------------------------------------------------------------------------

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') 
  elLink.href = imgContent
}

// ----------------SAVE MEME

function saveMeme(){
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  addMeme(imgContent)
  renderSavedMemes()
}


function  renderSavedMemes(){
  const elGallleryPage=document.querySelector('.meme-gallery-page')
  elGallleryPage.classList.add('hide')
  const elMemegen =document.querySelector('.meme-editor-page')
  elMemegen.classList.add('hide')
  const elMemeGalllery=document.querySelector('.memes-gallery-continer')
  elMemeGalllery.classList.remove('hide')
  const elGallleryMemes=elMemeGalllery.querySelector('.gallery-continer')
  var strHTML=''
  const gMemes=getUserMemes()
  gMemes.forEach((meme)=>{
    strHTML+=`<img src="${meme.url}" onclick="onSelectImg('${meme.url}')"/>`
  })
  elGallleryMemes.innerHTML=strHTML

}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function onSetFilterBy(filterBy) { 
  setFilter(filterBy)
  renderGallery()
}