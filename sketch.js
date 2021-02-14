//Create variables here
var foodS
var lastFed = 0;

function preload()
{
  sadDog= loadImage("dogImg.png")
  happydog= loadImage("dogImg1.png")

  
}

function setup() {
  database= firebase.database();
  createCanvas(1000, 400);
  
foodObj=new Food()
dog= createSprite(800,200,150,150);
dog.addImage(sadDog)
dog.scale=0.15
feed = createButton("Feed The Dog")
feed.position(700,95);
feed.mousePressed(feedDog)
addFood= createButton("Add the Food");
addFood.position(800,95);
addFood.mousePressed(addFoods)
foodStock = database.ref("Food")
foodStock.on("value",readStock);
textSize(20);

}



function draw() {  
background("lightblue");
foodObj.display();
//start from here
fedTime=database.ref("FeedTime")
fedTime.on("value",function(data){
  lastFed= data.val();
})
fill(255,255);
textSize(15);

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}
else if(lastFed == 0){
  text("Last Feed : 12 AM",350,30);
}
else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}


  drawSprites();

}
function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happydog)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()* 0)
  }
  else {foodObj.updateFoodStock(foodObj.getFoodStock()-1)}

  database.ref("/").update({
  Food:foodObj.getFoodStock(),FeedTime:hour()
  })
  }
function addFoods(){
  foodS= foodS+1;
  database.ref("/").update({
    Food:foodS
  })

}
