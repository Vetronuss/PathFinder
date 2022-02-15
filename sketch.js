
var grid = [];
var gridSize = 100;
var start = [0,0]
var goal = [gridSize-1,gridSize-1]
var windowSize;
var spotSize;
var finished = false;

function setup() {
  windowSize = windowWidth
  if (windowSize > windowHeight)
  {
    windowSize = windowHeight;
  }
  createCanvas(windowSize, windowSize);
  for (var i = 0; i < gridSize; i++)
  {
    grid.push([]);
    for (var o = 0; o < gridSize; o++)
    {
      if (i == goal[1] && o == goal[0])
      {
        grid[i].push(new Spot(i,o,'e',true))
      }if (i == start[1] && o == start[0])
      {
        grid[i].push(new Spot(i,o,'se',false))
      }else{
        if (random(0,3) <= 1){
          grid[i].push(new Spot(i,o,'b',false))
        }else
        {
          grid[i].push(new Spot(i,o,'e',false))
        }
      }
    }
  }
  spotSize = windowSize/gridSize;
}

function search()
{
  for (var i = 0; i < gridSize; i++)
  {
    for (var o = 0; o < gridSize; o++)
    {
      if (grid[i][o].search(grid));
    }
  }
}



function keyPressed()
{
  search();
  search();
  search();
}

function draw() {
  background(100);
  
  //draw grid
  for (var i = 0; i < gridSize; i++)
  {
    for (var o = 0; o < gridSize; o++)
    {
      grid[i][o].draw();
    }
  }
  
  if (finished)
  {
    grid[goal[1]][goal[0]].traceBack();
  }
  
  
  
  
  
  
}


function distance(x1,y1,x2,y2)
{
  var distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
  return distance;
}

