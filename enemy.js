var Mayfly = function(startX, startY, speedMod, shooter)
{
	if(typeof shooter == 'undefined')
	{
		shooter = false;
	}
	this.health = 2;
	this.position = new Vector2();
	this.position.set(startX,startY);
	this.velocity = new Vector2();
	this.velocity.set(-BASE_MAXSPEED * speedMod, 0);
	this.sprite = new Sprite("mayfly.png");
	this.width = 32;
	this.height = 32;
	this.sprite.buildAnimation(1, 1, this.width, this.height, 0.5,[0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.active = false;
	this.routine = AI_NONE;
	this.damage = 3;
	this.offscreen = false;
	this.shoots = shooter;
	this.cooldown = 1;
}

var Sam = function(startX, startY)
{
	this.health = 5;
	this.position = new Vector2();
	this.position.set(startX+40,startY-15);
	this.velocity = new Vector2();
	this.velocity.set(0, -(BASE_MAXSPEED*5));
	this.sprite = new Sprite("sam.png");
	this.width = 32;
	this.height = 32;
	this.sprite.buildAnimation(1, 1, this.width, this.height, 0.5,[0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.active = false;
	this.routine = AI_NONE;
	this.damage = 6;
	this.offscreen = false;
}

Mayfly.prototype.update = function(dt)
{	
	if(this.active)
	{
		this.position.set(this.position.x + (this.velocity.x * dt), this.position.y + (this.velocity.y * dt));
//		debugger;
		if(this.position.x < worldOffsetX)
		{
			this.offscreen = true;
		}
		if(this.shoots)
		{
			if(this.cooldown >= 0)
			{
				this.cooldown -= dt;
			}
			if(this.cooldown < 0)
			{
			
				var deviation = Math.random()*BULLET_SPEED;
				enemyBullets.push(new Bullet(this.position.x, this.position.y, 0, true, deviation-BULLET_SPEED/2));
				this.cooldown = 1;
			
			}
		}
	}
	else if(this.position.x < (worldOffsetX + SCREEN_WIDTH + 50))
	{
		this.active = true;
	}
}

Mayfly.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x-worldOffsetX-(this.width/2), this.position.y-(this.height/2));
}

Sam.prototype.update = function(dt)
{	
	if(this.active)
	{
		this.position.set(this.position.x + (this.velocity.x * dt), this.position.y + (this.velocity.y * dt));
		if(this.position.y < 0)
		{
			this.offscreen = true;
		}
//		debugger;
	}
	else if(this.position.x < playerX + 100)
	{
		this.active = true;
	}
}

Sam.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x-worldOffsetX-(this.width/2), this.position.y-(this.height/2));
}