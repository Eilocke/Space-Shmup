var EnemyBullet = function(bulletX, bulletY)
{
        this.position = new Vector2;
        this.velocity = new Vector2
        this.width = 15;
        this.height = 7;
        this.position.set(bulletX, bulletY);
        this.image = document.createElement("img");
        this.depleted = false;
		this.special = false;
       
        if (this.special)
        {
 
                this.image.src = "bullet_special.png";  
                this.velocity.set(-BULLET_SPEED, 0);
               
        }
        else
        {
 
                this.image.src = "bullet.png";                 
                this.velocity.set(-BULLET_SPEED, 0);
               
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