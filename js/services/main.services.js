'use strict'

const MEMES_KEY= 'memesDB'
const MEMESEARCH_KEY= 'memeSearchDB'
const gImgs = [
  {
    id: 1,
    url: "img/memes/meme-imgs-square/1.jpg",
    keywords: ["funny", "president"],
  },
  {
    id: 2,
    url: "img/memes/meme-imgs-square/2.jpg",
    keywords: ["cute", "dogs"],
  },
  {
    id: 3,
    url: "img/memes/meme-imgs-square/3.jpg",
    keywords: ["cute", "dogs"],
  },
  {
    id: 4,
    url: "img/memes/meme-imgs-square/4.jpg",
    keywords: ["sleep", "cat"],
  },
  {
    id: 5,
    url: "img/memes/meme-imgs-square/5.jpg",
    keywords: ["funny", "baby"],
  },
  {
    id: 6,
    url: "img/memes/meme-imgs-square/6.jpg",
    keywords: ["funny", "doctor"],
  },
  {
    id: 7,
    url: "img/memes/meme-imgs-square/7.jpg",
    keywords: ["funny", "baby"],
  },
  {
    id: 8,
    url: "img/memes/meme-imgs-square/8.jpg",
    keywords: ["happy", "famous", "movie"],
  },
  {
    id: 9,
    url: "img/memes/meme-imgs-square/9.jpg",
    keywords: ["funny", "baby"],
  },
  {
    id: 10,
    url: "img/memes/meme-imgs-square/10.jpg",
    keywords: ["funny", "president"],
  },
  {
    id: 11,
    url: "img/memes/meme-imgs-square/11.jpg",
    keywords: ["funny", "sport"],
  },
  {
    id: 12,
    url: "img/memes/meme-imgs-square/12.jpg",
    keywords: ["funny", "famous"],
  },
  {
    id: 13,
    url: "img/memes/meme-imgs-square/13.jpg",
    keywords: ["movie", "famous"],
  },
  {
    id: 14,
    url: "img/memes/meme-imgs-square/14.jpg",
    keywords: ["movie", "famous"],
  },
  {
    id: 15,
    url: "img/memes/meme-imgs-square/15.jpg",
    keywords: ["movie", "famous"],
  },
  {
    id: 16,
    url: "img/memes/meme-imgs-square/16.jpg",
    keywords: ["movie", "famous"],
  },
  {
    id: 17,
    url: "img/memes/meme-imgs-square/17.jpg",
    keywords: ["funny", "president"],
  },
  {
    id: 18,
    url: "img/memes/meme-imgs-square/18.jpg",
    keywords: ["movie", "famous"],
  },
];

var gMeme = {
  url:"",
  selectedLineIdx: 0,
  isSelected:false,
  lines: [
    {
      lineX: 0,
      lineY:30,
      txt: "add a text",
      size: 40,
      fillStyle: "white",
      strokeStyle : 'black',
      textAlign:"center",
      fontStyle: "Impact",
      isDrag:false,
      pos:{ startX:0 ,endX:0 ,startY:0,endY:0},
    },
  ],
};
var gImgMemes
var userMemes
var filterBySearch=''
getSaveMemes()
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
function setFilter(filterBy){
  filterBySearch=filterBy
}
function getSortedImges(){
  var gImgMemes = gImgs.filter(
    (img) =>img.keywords.some(word=>word.includes(filterBySearch.text)) 
  );
  if(gImgMemes.length===0) gImgMemes=gImgs
  return gImgMemes
}

function getUserMemes(){
  return userMemes
}

function getSaveMemes(){
  userMemes=_loadMemes()
  if(userMemes&&userMemes.length)return
}

function addMeme(imgContent){
 const savedMeme=_createMeme(imgContent)
 console.log(savedMeme)
 console.log(userMemes)
 userMemes.push(savedMeme)
 _saveMemes()
}

function updateLinepos(posX,posY){
  gMeme.lines[gMeme.selectedLineIdx].lineX=posX
  gMeme.lines[gMeme.selectedLineIdx].lineY=posY
}

function setLinePosSize(startX,endX,startY,endY){
  gMeme.lines[gMeme.selectedLineIdx].pos.startX=startX
  gMeme.lines[gMeme.selectedLineIdx].pos.endX=endX
  gMeme.lines[gMeme.selectedLineIdx].pos.startY=startY
  gMeme.lines[gMeme.selectedLineIdx].pos.endY=endY
}

function setSelcted(isSelected){
  gMeme.isSelected=isSelected
  console.log(gMeme.isSelected)
}

function setStrokeStyle(colorStroke){
 gMeme.lines[gMeme.selectedLineIdx].strokeStyle=colorStroke
}

function setFillStyle(colorFill){
  gMeme.lines[gMeme.selectedLineIdx].fillStyle=colorFill
}


function setFontStyle(font){
  gMeme.lines[gMeme.selectedLineIdx].fontStyle=font
}

function setTextAlign(direction){
  gMeme.lines[gMeme.selectedLineIdx].textAlign=direction
}

function setFontSize(diff){
  if(gMeme.lines[gMeme.selectedLineIdx].size+diff>=0){
    gMeme.lines[gMeme.selectedLineIdx].size+=diff
  }
}
function setText(txt){
  gMeme.lines[gMeme.selectedLineIdx].txt=txt
}
function setSelectedLine(lineIdx){
  gMeme.selectedLineIdx=lineIdx
}
function setTextLine(diff){
  if(gMeme.selectedLineIdx===0 && diff===-1){
    gMeme.selectedLineIdx=gMeme.lines.length-1
    return
  }
  if(gMeme.selectedLineIdx===gMeme.lines.length-1 && diff===1){
    gMeme.selectedLineIdx=0
    return
  }
  gMeme.selectedLineIdx+=diff
  return
}

function deleteLine(){
  gMeme.lines.splice(gMeme.selectedLineIdx,1)
  gMeme.selectedLineIdx=gMeme.lines.length-1
}

function createLine(x, y){
  if(gMeme.lines.length===0) y=30
  if(gMeme.lines.length===1) y=y*2-40
  const line={
    lineX: x,
    lineY:y,
    txt: "add a text",
    size: 40,
    fillStyle: "white",
    strokeStyle : 'black',
    textAlign:"center",
    fontStyle: "Impact",
    isDrag:false,
    pos:{ startX:0 ,endX:0 ,startY:0,endY:0},
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx=gMeme.lines.length-1
}

// function getImgMeme(){
//   const idxImg= gImgs.findIndex(img=>img.url===gMeme.url)
//   const url=
//   return gImgs[idxImg].url
// }

function getImges(){
  return gImgs
}
function getGmeme(){
  return gMeme
}
function updateGmeme(imgUrl,x){
 gMeme.url=imgUrl
 gMeme.lines[0].lineX=x
}



function _createMeme(img_url){
  const meme={
    url:img_url,
  }
return meme
}

//  drag and drop
function isLineClicked(clickedPos) {

    const { offsetX, offsetY} = clickedPos
    console.log(offsetX,offsetY)
    console.log(clickedPos)
    const gLines =getGmeme().lines
    const clickedLine = gLines.find(line => {
        return offsetX >= line.pos.startX && offsetX <= line.pos.endX
            && offsetY >= line.pos.startY && offsetY <= line.pos.endY
    })
    if (clickedLine) {
      const lineIdx= gLines.findIndex(line=>line===clickedLine)
      setSelectedLine(lineIdx)
      setSelcted(true)
      return true
    } 
    setSelcted(false)
    return false
  }


function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].lineX += dx
  gMeme.lines[gMeme.selectedLineIdx].lineY += dy
}


// Storge


function _saveMemeSearch(){
  saveToStorage(MEMESEARCH_KEY,gKeywordSearchCountMap)
}
function _saveMemes(){
  saveToStorage(MEMES_KEY,userMemes)
}
function _loadMemeSearch(){
  loadFromStorage(MEMESEARCH_KEY,gKeywordSearchCountMap)
}
function _loadMemes(){
  loadFromStorage(MEMES_KEY,userMemes)
}