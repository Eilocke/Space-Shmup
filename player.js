var ANIM_FLY = 0;
var ANIM_SHOOT = 1;
var ANIM_FLY_BT = 2;
var ANIM_SHOOT_BT = 3;
var ANIM_FIRE_FLY = 4;
var ANIM_FIRE_SHOOT = 5;
var ANIM_FIRE_FLY_BT = 6;
var ANIM_FIRE_SHOOT_BT = 7;
var ANIM_MAX = 8;

var Player = function(st)
{
	this.sprite = new Sprite("player_ship.png");
	//Most of these animations are unused, but they're in the sprite so I built them anyway.
    //healthy moving
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[0, 1,]);
    //healthy shooting
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[2, 3,]);
    //healthy moving BT
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[4, 5,]);
    //healthy shooting BT
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[6, 7,]);
    //fire moving
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[8, 9,]);
    //fire shooting
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[10, 11,]);
    //fire moving BT
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[12, 13,]);
    //fire shooting BT
    this.sprite.buildAnimation(8, 2, 108, 37, 0.1,[14, 15,]);

    for(var i=0; i<ANIM_MAX; i++)
    {
            this.sprite.setAnimationOffset(i, 0, 0);
    }
	this.position = new Vector2();
	this.position.x = 50;
	this.position.y = 440;
	this.cooldown = 0;
	this.eCooldown = 0;
	this.velocityX = 0;
	this.velocityY = 0;
	this.drag = BASE_DRAG;
	this.accelF = BASE_SHIP_ACCEL;
	this.accelY = BASE_SHIP_ACCEL;
	this.accelR = BASE_SHIP_ACCEL*0.75;
	this.speed = 0;
	this.lift = 0;
	this.maxForward = BASE_MAXSPEED;
	this.maxRev = BASE_MAXSPEED*0.75;
	this.cruise = CRUISE_SPEED;
	this.cruisedDistance = 0;
	this.currentDrag = this.drag;
	this.shipType = st;
	this.gunOffsetY = 10;
	this.gunOffsetX = 50;
	this.invincibility = 0;
	this.width = 100;
	this.height = 30;
	this.hitboxX = 32;
	this.hitboxY = 32;
	this.life = 20;
	this.energy = 20;
	
	//this.mod = MOD_NONE;
}

Player.prototype.damage = function(damage, iframes)
{
	this.life -= damage;
	this.invincibility = iframes;
	scoreMultiplier = 1;
	score -= 100;
}
Player.prototype.update = function(dt)
{	
	if(this.cooldown >= 0)
	{
		this.cooldown -= dt;
	}
	if(this.eCooldown >= 0)
	{
		this.eCooldown -= dt;
	}
	if(this.invincibility >= 0)
	{
		this.invincibility -= dt;
	}
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true && this.cooldown < 0 && this.energy > 0)
	{
		
		playerBullets.push(new Bullet(this.position.x+this.gunOffsetX, this.position.y+this.gunOffsetY, this.velocityX));
		this.cooldown = 0.2;
		this.eCooldown = 1;
		this.energy -= 1;
		sfxFire.play();		
	}
	else if(this.energy < 20 && this.eCooldown < 0)
	{
		this.eCooldown = 0.2;
		this.energy += 1;
		sfxEnergy.play();

	}
	if(keyboard.isKeyDown(keyboard.KEY_D) == true )
	{
		this.sprite.setAnimation(ANIM_FLY);
		this.speed += (this.accelF * dt);
	}
	else if(keyboard.isKeyDown(keyboard.KEY_A))
	{
		this.sprite.setAnimation(ANIM_FLY_BT);
		this.speed -= (this.accelR * dt);
	}
	else
	{
		if(this.speed > 0)
		{
			if(this.speed <= (this.drag*dt))
			{
				this.speed = 0;
			}
			else
			{
				this.speed -= (this.drag*dt);
			}
		}
		else if(this.speed < 0)
		{
			if(this.speed >= -(this.drag*dt))
			{
				this.speed = 0;
			}
			else
			{
				this.speed += (this.drag*dt);
			}
		}
	}
	if(keyboard.isKeyDown(keyboard.KEY_W))
	{
		this.lift -= (this.accelY * dt);
	}
	else if(keyboard.isKeyDown(keyboard.KEY_S))
	{
		this.lift += (this.accelY * dt);
	}
	else
	{
		if(this.lift > 0)
		{
			if(this.lift <= (this.drag*dt))
			{
				this.lift = 0;
			}
			else
			{
				this.lift -= (this.drag*dt);
			}
		}
		else if(this.lift < 0)
		{
			if(this.lift >= -(this.drag*dt))
			{
				this.lift = 0;
			}
			else
			{
				this.lift += (this.drag*dt);
			}
		}
	}
	
	this.speed = bound(this.speed, -this.maxRev, this.maxForward);
	this.lift = bound(this.lift, -this.maxForward, this.maxForward);
	
	this.velocityX = (this.speed + this.cruise)*dt;
	this.cruisedDistance += (this.cruise) * dt;
	this.velocityY = this.lift * dt;

	this.position.set(bound(this.position.x + this.velocityX, worldOffsetX, worldOffsetX + SCREEN_WIDTH), bound(this.position.y + this.velocityY, 0, SCREEN_HEIGHT));
	if(this.invincibility <= 0)
	{
		for(e = 0; e < enemies.length; e++)
		{
			if(this.position.intersects(this.position.x, this.position.y, this.hitboxX, this.hitboxY,
														enemies[e].position.x, enemies[e].position.y,  32, 32))
			{
					
				this.damage(enemies[e].damage, 1);
				enemies.splice(e, 1);
						
			}
		}
		for(b = 0; b < enemyBullets.length; b++)
		{
			if(enemyBullets[b].position.intersects(enemyBullets[b].position.x, enemyBullets[b].position.y, enemyBullets[b].width, enemyBullets[b].height,
												this.position.x, this.position.y,  this.width, this.height))
			{
			
				enemyBullets[b].depleted = true;
				this.damage(1, 0.2);
				
			}
		}
	}
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%35; // true if player overlaps right
	var ny = (this.position.y)%35; // true if player overlaps below
	var cell = cellAtTileCoord(LAYER_WALLS, tx+1, ty+1);
	var celld = cellAtTileCoord(LAYER_WALLS, tx, ty+1);
	var trigcell = cellAtTileCoord(LAYER_LEVELEND, tx, ty);

	if (cell || celld)
	{
				this.damage(20, 0);
	}	
	if(trigcell)
	{
		stateManager.switchState(new WinState());	
	}		

	playerX = this.position.x;
//	if(keyboard.isKeyDown(keyboard.KEY_W))
//	{
//		debugger;
//	}
}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x-worldOffsetX-(this.width/2), this.position.y-(this.height/2));
}