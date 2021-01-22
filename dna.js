// A generic function to swap two elements in an array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// A DNA object is an order through the grids
function DNA(total, order) {

  // Start assuming it's distance is infinity and fitness is zero
  this.dist = Infinity;
  this.fitness = 0;
/*
  // Is this being made from another DNA object?
  if (order instanceof Array) {
console.log("instance")
    // Just copy the order
    this.order = order.slice();
    // Mutation
    // 50% of the time shuffle one spot to see if it improves
    if (random(1) < 0.05) {
      this.shuffle();
    } 
  } else {*/
    // Create a random order
	//var t=createVector(targetgrid.x,targetgrid.y);
    this.order=null;
	this.order=[];
	//console.log(this.order)
	var done=0;
	this.order.push(startgrid);
	//console.log("added")
	//console.log(startgrid)
	//console.log(this.order)
    for (var i = startgrid; done<1;) {
    	var r = randomneighbor(i);
		console.log(r)
		for (var obs=0; obs<obstacles.length; obs++)
		{
			/*
			//var stop=0;
			for(var ord=0; ord<this.order.length; ord++){
				console.log(ord)
				if(this.order[ord].x===r.x && this.order[ord].y===r.y){ //already in the order
					r = randomneighbor(i); //create new random
					ord=-1;
					obs=0;
					//var stop=1;
					console.log("in order")
				}
			}
			*/
			if(obstacles[obs].x===r.x && obstacles[obs].y===r.y){ //already in the order
					r = randomneighbor(i); //create new random
					ord=-1;
					obs=-1;
					//console.log("in obs")
				}
		}
		
		this.order.push(r);
		i=r;
		for(var k=0; k<neighbors(i).length; k++){
			if(neighbors(i)[k].x===targetgrid.x && neighbors(i)[k].y===targetgrid.y){
				this.order.push(targetgrid);
				done =1;
				//console.log("is neighbor")
				//console.log(done)
				break;
			}
		}
		if (done==1){
			//console.log("break")
			break;
		}
    }
	console.log("out")

}


//function to get all neighbors array
function neighbors(g) {
	var allneighbors= [];
	var n;
	
	if(g.x-1>-1 && g.x-1<dimentions){
		if(g.y-1>-1 && g.y-1<dimentions){
			if(g.x-1>0 || g.y-1>0){
				n= createVector(g.x-1, g.y-1);
				allneighbors.push(n);
			}
		}
	}
	if(g.x-1>-1 && g.x-1<dimentions){
		if(g.y>-1 && g.y<dimentions){
			if(g.x-1>0 || g.y>0){
				n= createVector(g.x-1, g.y);
				allneighbors.push(n);
			}
		}
	}
	if(g.x+1>-1 && g.x+1<dimentions){
		if(g.y-1>-1 && g.y-1<dimentions){
			if(g.x+1>0 || g.y-1>0){
				n= createVector(g.x+1, g.y-1);
				allneighbors.push(n);
			}
		}
	}
	if(g.x-1>-1 && g.x-1<dimentions){
		if(g.y+1>-1 && g.y+1<dimentions){
			if(g.x-1>0 || g.y+1>0){
				n= createVector(g.x-1, g.y+1);
				allneighbors.push(n);
			}
		}
	}
	if(g.x>-1 && g.x<dimentions){
		if(g.y+1>-1 && g.y+1<dimentions){
			if(g.x>0 || g.y+1>0){
				n= createVector(g.x, g.y+1);
				allneighbors.push(n);
			}
		}
	}				
	if(g.x+1>-1 && g.x+1<dimentions){
		if(g.y>-1 && g.y<dimentions){
			if(g.x+1>0 || g.y>0){
				n= createVector(g.x+1, g.y);
				allneighbors.push(n);
			}
		}
	}
	if(g.x+1>-1 && g.x+1<dimentions){
		if(g.y+1>-1 && g.y+1<dimentions){
			if(g.x+1>0 || g.y+1>0){
				n= createVector(g.x+1, g.y+1);
				allneighbors.push(n);
			}
		}
	}

	return allneighbors;
}

//function to get a random neighbor
function randomneighbor(g) {
	var n=neighbors(g);
	var randomgrid = n[Math.floor(Math.random()*n.length)];
	
	return randomgrid;
}

// Shuffle array one time
DNA.prototype.shuffle = function() {
  var i = floor(random(this.order.length));
  var j = floor(random(this.order.length));
  swap(this.order, i, j);
}

// How long is this particular path?
DNA.prototype.calcDistance = function() {
	var sum = 0;
	for (var i = 0; i < this.order.length - 1; i++) {
		var grid1 = this.order[i];
		var grid2 = this.order[i+1];
		var d = dist(grid1.x, grid1.y, grid2.x, grid2.y);
		sum += d;
	}
	this.dist = sum;
	return this.dist;
}

// Map the fitess where shortest is best, longest is worst
DNA.prototype.mapFitness = function(minD, maxD) {
  this.fitness = map(this.dist, minD, maxD, 1, 0);
  return this.fitness;
}

// Normalize against total fitness
DNA.prototype.normalizeFitness = function(total) {
  this.fitness /= total;
}

// Draw the path
DNA.prototype.show = function() {
		n=-1;
		for(i=0 ; i<dimentions ;i++){
		//console.log("first loop")
			for(j=0 ; j<dimentions ;j++){
				       //console.log("second loop")
				var x=i*30;
				var y=j*30;
						//console.log("color")
						//console.log(this.newcolors[i][j])
				fill(newcolors[i][j]);
						
				stroke(0);
				rect(x,y,30,30);
				
				n++;
				fill(0);
				s=num[n];
	
				text(s, x+15, y+15); // Text wraps within the square
				textAlign(CENTER, CENTER);
				
			}
		}
}
// Draw the path instantly
DNA.prototype.show2 = function() {
		n=-1;
		for(i=0 ; i<dimentions ;i++){
		//console.log("first loop")
			for(j=0 ; j<dimentions ;j++){
				       //console.log("second loop")
				var x=i*30;
				var y=j*30;
						//console.log("color")
						//console.log(this.newcolors[i][j])
				fill(newcolors2[i][j]);
						
				stroke(0);
				rect(x,y,30,30);
				
				n++;
				fill(0);
				s=num[n];
	
				text(s, x+15, y+15); // Text wraps within the square
				textAlign(CENTER, CENTER);
				
			}
		}
}

// This is one way to crossover two paths
DNA.prototype.crossover = function(other) {

  // Grab two orders
  var order1 = this.order; //a
  var order2 = other.order; //b

  // Pick a random cross point
	if(order1.length<order2.length)
	{
		//console.log(order1)
		var cross = floor(random(1, order1.length -2));
		//console.log("order1.length")
		//console.log(order1.length)
		//console.log("r")
		//console.log(cross)
		// Grab part of the the first order
  		var neworder = order1.slice(0, cross);
		//console.log("o1")	
		//console.log(order1)
		//console.log("new")
		//console.log(neworder)
		lastg= order1[cross-1];
		//console.log(lastg)	
		//console.log("order2 next")
		//console.log(order2)
		//console.log("order2.length")
		//console.log(order2.length)
		// Go through order 2
		var firstofsecond = 0;
		var found = 0;
		// As long as we aren't finished
		for (var i=order2.length-1; i>-1;i--) {
		// find last grid that is neighbor of lastg
			for(var k=0; k<neighbors(order2[i]).length; k++){
				if(neighbors(order2[i])[k].x===lastg.x && neighbors(order2[i])[k].y===lastg.y){
					firstofsecond=i;
					found=1;
					break;
				}
			}
			if(found==1){
				break;
			}
		}
		if(found==1){
			for(var i=firstofsecond; i<order2.length; i++){
				neworder.push(order2[i]);
			
			}
			//console.log("new o")
			//console.log(neworder)
			return neworder;
		}
		if(found==0){
			return order1;
			//console.log("returned o1")
		}
	}
	else{
		//console.log(order2)
		var cross = floor(random(1, order2.length -2));
		// Grab part of the the first order
  		var neworder = order2.slice(0, cross);
		//console.log("order2.length")
		//console.log(order2.length)
		//console.log("r")
		//console.log(cross)
		lastg= order2[cross-1];
		//console.log(lastg)
		//console.log("order1 next")
		//console.log(order1)
		//console.log("order1.length")
		//console.log(order1                                                                                                                             .length)
		
		// Go through order 1
		var firstofsecond = 0;
		var found = 0;
		// As long as we aren't finished
		for (var i=order1.length-1; i>-1;i--) {
		// find last grid that is neighbor of lastg
			for(var k=0; k<neighbors(order1[i]).length; k++){
				if(neighbors(order1[i])[k].x===lastg.x && neighbors(order1[i])[k].y===lastg.y){
					firstofsecond=i;
					found=1;
					break;
				}
			}
			if(found==1){
				break;
			}
		}
		if(found==1){
			for(var i=firstofsecond; i<order1.length; i++){
				neworder.push(order1[i]);
			
			}
			//console.log("new o")
			//.log(neworder)
			return neworder;
		}
		if(found==0){
			//console.log("o2 returned")
			return order2;
		}
	}
}