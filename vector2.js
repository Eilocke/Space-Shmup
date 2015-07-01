var Vector2 = function() {
	
	this.x = 0;
	this.y = 0;
	
}

Vector2.prototype.set = function(x,y)
{
	this.x = x;
	this.y = y;
}

Vector2.prototype.normalize = function()
{
	
	magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
	this.x /= magnitude;
	this.y /= magnitude;
	
}

Vector2.prototype.add = function(v2)
{

	this.x += v2;
	this.y += v2;
	
}

Vector2.prototype.subtract = function(v2)
{
	
	this.x -= v2;
	this.y -= v2;
	
}

Vector2.prototype.multiplyScalar = function(num)
{
	
	this.x *= num;
	this.y *= num;
	
}


// Typical collision detection function
Vector2.prototype.intersects = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
		
		if(x1 + (w1/2) < x2 - (w2/2) || x1 - (w1/2) > x2 + (w2/2) ||
		y1 + (h1/2) < y2 - (h2/2) || y1 - (h1/2) > y2 + (h2/2))
		{
			return false;
		}
		return true;

}

var vector2 = new Vector2();
