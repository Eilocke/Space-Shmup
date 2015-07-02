// Enemy stats
Mayfly.health = 2;
Mayfly.speedX = BASE_MAXSPEED;
Mayfly.speedY = 0;
Mayfly.sprite = "mayfly.png";
Mayfly.width = 108;
Mayfly.height = 37;
Mayfly.routine = AI_NONE

Sam.health = 999;
Sam.speedX = 0;
Sam.speedY = BASE_MAXSPEED/2;
Sam.sprite = "sam.png";
Sam.width = 37;
Sam.height = 108;
Sam.routine = AI_NONE

var Enemy = function(x, y, type)
{
	this.health = type.health;
	this.position = new Vector2();
	this.position.set(x,y);
	this.velocity = new Vector2();
	this.velocity.set(type.speedX, type.speedY);
	this.sprite = new Sprite(type.sprite);
	this.width = type.width;
	this.height = type.height;
	Mayfly.sprite.buildAnimation(1, 1, this.width, this.height, 0.5,[0]);
	Mayfly.sprite.setAnimationOffset(0, 0, 0);
	this.active = false;
	this.routine = type.routine;
}

Enemy.prototype.update = function(dt)
{	
	if(this.active)
	{
		if(routine = AI_NONE)
		{
			this.position.set(this.position.x + (this.velocity.x + dt), this.position.y + (this.velocity.y + dt));
		}		
	}
	else if(this.position.x < (worldOffsetX + SCREEN_WIDTH + 50))
	{
		this.active = true;
	}
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x-worldOffsetX, this.position.y);
}