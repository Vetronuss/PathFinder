class Spot
{
  
  
  constructor(x,y,state,goal)
  {
    this.x = x;
    this.y = y;
    this.state = state;
    this.last = [];
    this.changed = false;
    this.recent = false;
    this.goal = goal;
  }
  
  draw()
  {
    if (this.goal == true)
    {
      fill(100,255,20)
      if (this.state == 's')
      {
        fill('purple')
      }
      square(this.x*spotSize,this.y*spotSize, spotSize)
      return;
    }
    if (this.state == 'e')
    {
      noFill();
    }
    else if (this.state == 'se')
    {
      fill('red')
    }
    else if (this.state == 's')
    {
      fill(30,30,255,255/2)
    }
    else if (this.state == 'b')
    {
      fill(0)
    }
    square(this.x*spotSize,this.y*spotSize, spotSize)
    
    
  }
  
  traceBack()
  {
    if (this.state == 'se')
    {
      return;
    }
    fill(0)
    stroke(0)
    strokeWeight(4)
    line(this.x*spotSize+(spotSize/2),this.y*spotSize+(spotSize/2),this.last[0]*spotSize+(spotSize/2),this.last[1]*spotSize+(spotSize/2))
    
    strokeWeight(1)
    grid[this.last[0]][this.last[1]].traceBack();
  }
  
  
  search(list)
  {
    if (this.recent)
    {
      if (this.goal)
      {
        finished = true;
        console.log("Done")
      }
      this.recent = false;
      return;
    }
    this.changed = false;
    if (this.state != 's' && this.state != 'se')
    {
      return this.changed;
    }
    
    if (this.y < gridSize-1)
      if (list[this.x][this.y+1].state == 'e')
      {
        list[this.x][this.y+1].state = 's';
        list[this.x][this.y+1].last = [this.x,this.y]
        list[this.x][this.y+1].recent = true;
        this.changed = true;
      }
    if (this.y > 0)
      if (list[this.x][this.y-1].state == 'e')
      {
        list[this.x][this.y-1].state = 's';
        list[this.x][this.y-1].last = [this.x,this.y]
        list[this.x][this.y-1].recent = true;
        this.changed = true;
      }
    if (this.x < gridSize-1)
      if (list[this.x+1][this.y].state == 'e')
      {
        list[this.x+1][this.y].state = 's';
        list[this.x+1][this.y].last = [this.x,this.y]
        list[this.x+1][this.y].recent = true;
        this.changed = true;
      }
    if (this.x > 0)
      if (list[this.x-1][this.y].state == 'e')
      {
        list[this.x-1][this.y].state = 's';
        list[this.x-1][this.y].last = [this.x,this.y]
        list[this.x-1][this.y].recent = true;
        this.changed = true;
      }
    
    return this.changed;
    
    
  }
    
  getDist()
  {
     return distance(goal[1],goal[0],this.x,this.y) 
  }
}

function findLeast(arr)
{
  var least = arr[0];
    var p= 0
    for (; p < arr.length; p++)
    {
      if (arr[p].getDist() < least.getDist())
      {
        least = arr[p];
      }
    }
  for (var i = 0; i < arr.length; i++)
  {
    if (least == arr[i])
    {
      return i;
    }
  }
}

function sortA(arr)
{
  var newArr = [];
  for (var i = 0; i < arr.length; i++)
  {
    newArr.push(arr[findLeast(arr)]);
    arr.splice(findLeast(arr));
  }
  return newArr;
}