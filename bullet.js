var Bullet = function(bulletX, bulletY, inheritX, hostile, inheritY)
{
	if (typeof inheritX == 'undefined')
	{
		
		inheritX = 0;
		
	}
	if (typeof inheritY == 'undefined')
	{
		
		inheritY = 0;
		
	}
	if (typeof hostile == 'undefined')
	{
		hostile = false;
	}
	this.position = new Vector2;
	this.velocity = new Vector2
	this.width = 15;
	this.height = 7;
	this.position.set(bulletX, bulletY);
	this.image = document.createElement("img");
	this.depleted = false;
	this.special = false;
   
	if (hostile)
	{

			this.image.src = "bullet_special.png";  
			this.velocity.set(-BULLET_SPEED+inheritX, 0+inheritY);
		   
	}
	else
	{

			this.image.src = "bullet.png";                 
			this.velocity.set(BULLET_SPEED+inheritX, 0+inheritY);
		   
	}
}
Bullet.prototype.update = function(deltaTime)
{
       
	this.position.set(this.position.x + this.velocity.x, this.position.y + this.velocity.y); 
	if (this.position.x > worldOffsetX + SCREEN_WIDTH)
	{
		this.depleted = true;
	}
}
 
Bullet.prototype.draw = function()
{
 
        var screenX = this.position.x - worldOffsetX -(this.width/2);
                context.drawImage(this.image, screenX, this.position.y-(this.height/2));
}