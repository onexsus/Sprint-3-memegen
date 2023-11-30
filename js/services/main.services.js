'use strict'

const MEMES_KEY= 'memesDB'
const MEMESEARCH_KEY= 'memeSearchDB'

var gImgs = [
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
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      color: "red",
    },
  ],
};
var userMemes=[]
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getImges(){
  return gImgs
}





function _createMeme(img_url){
  const meme={
    id:_createId(),
    url:img_url,
  }
return meme
}

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