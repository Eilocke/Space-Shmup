var GameState = function() 
{
}

var MAP = {tw: 1000, th: 15};
var TILE = 70;
var TILESET_TILE = TILE;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 4;
var TILESET_COUNT_Y = 8;
var LAYER_COUNT = 4;
var LAYER_DRAW_COUNT = 3;
var LAYER_FOREGROUND = 0;
var LAYER_WALLS = 1;
var LAYER_BACKGROUND = 2;
var LAYER_MAYFLIES = 4;
var LAYER_SAMS = 5;
var LAYER_HORNETS = 6;
var LAYER_LEVELEND = 3;
var MAX_LIFE = 20;
var cells = [];
var tileset = document.createElement("img");
var worldOffsetX = 0;
tileset.src = "tileset.png";
var playerBullets = [];
var enemyBullets = [];
var enemies = [];
var score = 0;
var scoreMultiplier = 1;
var playerX = 0;
var et = [];
var ebt = [];
var pbt = [];

function roll(max, min)
{
	if (typeof min == 'undefined')
	{
		min = 1;
	}
	if (typeof max == 'undefined')
	{
		max = 100;
	}
	
	var roll = Math.floor(Math.random() * (max - 1 + min)) + min;
	
	return roll;
	
}
function initialize()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < level1.layers[layerIdx].height; y++)
		{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] != 0)
				{
					// for each tile we find in the layer data, we need to create 4 collisions
					// (because our collision squares are 35x35 but the tile in the
					// level are 70x70)
					cells[layerIdx][y][x] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					// if we haven't set this cell's value, then set it to 0 now
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_MAYFLIES].height; y++)
	{
		for(var x = 0; x < level1.layers[LAYER_MAYFLIES].width; x++)
		{
			if(level1.layers[LAYER_MAYFLIES].data[idx] != 0)
			{
				// Creates enemies at spawn points
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Mayfly(px, py, 1, true);
				enemies.push(e);
			}
		idx++;
		}
	}
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_HORNETS].height; y++)
	{
		for(var x = 0; x < level1.layers[LAYER_HORNETS].width; x++)
		{
			if(level1.layers[LAYER_HORNETS].data[idx] != 0)
			{
				// Creates enemies at spawn points
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Hornet(px, py, 2);
				enemies.push(e);
			}
		idx++;
		}
	}
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_SAMS].height; y++)
	{
		for(var x = 0; x < level1.layers[LAYER_SAMS].width; x++)
		{
			if(level1.layers[LAYER_SAMS].data[idx] != 0)
			{
				// Creates enemies at spawn points
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Sam(px, py);
				enemies.push(e);
			}
		idx++;
		}
	}
}

function updateEnemies()
{
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(dt);
		if(enemies[i].health <= 0)
		{
			et.push(i);
			sfxBoom.play();		
			scoreAdd(50);
		}
		if(enemies[i].position.x < worldOffsetX)
		{
			et.push(i);
		}
	}
}

function drawEnemies()
{
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw();
	}
}
function updateBullets()
{
	for(var b = 0; b < playerBullets.length; b++)
	{
		playerBullets[b].update();

		for(var e = 0; e < enemies.length; e++)
		{
								
			if(playerBullets[b].position.intersects(playerBullets[b].position.x, playerBullets[b].position.y, playerBullets[b].width, playerBullets[b].height,
												enemies[e].position.x, enemies[e].position.y,  enemies[e].width, enemies[e].height))
			{
			
				pbt.push(b);
				enemies[e].health -= 1;
				
			}
		} 
		if (playerBullets[b].position.x < worldOffsetX || playerBullets[b].position.x > worldOffsetX + SCREEN_WIDTH)
		{
			
			pbt.push(b);

		}
	}
	for(var b = 0; b < enemyBullets.length; b++)
	{
		enemyBullets[b].update();
								
		if (enemyBullets[b].position.x < worldOffsetX)
		{
			ebt.push(b);

		}
	}
}

function lifeHandler()
{
	if(player.life <= 0)
	{
		stateManager.switchState(new DeathState());		
	}
}
function scoreAdd(add)
{
	score += add * scoreMultiplier;	
	scoreMultiplier++;
}

function drawBullets()
{
	for(var idx = 0; idx < playerBullets.length; idx++)
	{
		playerBullets[idx].draw();
	}
	for(var idx = 0; idx < enemyBullets.length; idx++)
	{
		enemyBullets[idx].draw();
	}
}
	hudImage = document.createElement("img");
	hudImage.src = "hud.png";	
	pipImage = document.createElement("img");
	pipImage.src = "lifePip.png";	
	epipImage = document.createElement("img");
	epipImage.src = "energyPip.png";	

function drawHud()
{
	context.drawImage(hudImage, 0, 0);
	context.font="64px Verdana";
	context.fillStyle = "#FFFFFF";
	context.fillText(score.toString(), SCREEN_WIDTH/2 -40, 60);
	var lifeUpdate = 19;
	for(idx = 0; idx < player.life; idx++)
	{
		context.drawImage(pipImage, lifeUpdate, 19);
		lifeUpdate += 11;		
	}
	var energyUpdate = 257;
	for(idx = 0; idx < player.energy; idx++)
	{
		context.drawImage(epipImage, energyUpdate, 19);
		energyUpdate += 11;		
	}
}

function handleTrash()
{
	for(idx = 0; idx < et.length; idx++)
	{
		enemies.splice(et[idx], 1);
	}
	for(idx = 0; idx < pbt.length; idx++)
	{
		playerBullets.splice(pbt[idx], 1);
	}
	for(idx = 0; idx < ebt.length; idx++)
	{
		enemyBullets.splice(ebt[idx], 1);
	}
	et = [];
	pbt = [];
	ebt = [];
}

// DETECTION BY PIXEL
function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH || y<0)
		return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(y>SCREEN_HEIGHT)
		return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

//DETECTION BY TILE
function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw || ty<0)
		return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(ty>=MAP.th)
		return 0;
	return cells[layer][ty][tx];
};

// CONVERT TILES TO PIXELS
function tileToPixel(tile)
{
	return tile * TILE;
};

// CONVERT PIXELS TO TILES
function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};

// DRAWS LEVEL
function drawMap(pPass)
{
	
	var startX = -1;
	// Calculate the number of tiles that can fit on-screen (+2 for overhang)
	var maxTiles = Math.floor(SCREEN_WIDTH / TILE) + 4;
	// Calculate the player's current tile using its vector.
	var tileX = pixelToTile(pPass.cruisedDistance);
	// Calculate the player's offset from its current tile.
	var offsetX = TILE + Math.floor(pPass.cruisedDistance%TILE);
	// Calculate the starting tile to draw from on the x-axis. Caps off if the camera is too close
	// to the beginning or end of the level.
	 startX = tileX - Math.floor(maxTiles / 2);

	if(startX < -1)
	{
		startX = 0;
		offsetX = 0;
	}
	if(startX > MAP.tw - maxTiles)
	{
		startX = MAP.tw - maxTiles + 1;
		offsetX = TILE;
	}

	// Calculates the amount that the world has been scrolled. Used when drawing the player.
	worldOffsetX = startX * TILE + offsetX;
	
	for(var layerIdx=0; layerIdx<LAYER_DRAW_COUNT; layerIdx++)
	{

		for (var y = 0; y < level1.layers[layerIdx].height; y++)
		{

			var idx = y * level1.layers[layerIdx].width + startX;

			for (var x = startX; x < startX + maxTiles; x++)
			{
				if (level1.layers[layerIdx].data[idx] != 0 )
				{
					var tileIndex = level1.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, (x-startX)*TILE - offsetX, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}
GameState.prototype.load = function() 
{
	player = new Player();
	initialize();
	musicBackground.play();
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(dt) 
{
	player.update(dt);
	updateBullets();
	updateEnemies();
	lifeHandler();
	handleTrash();
}

GameState.prototype.draw = function() 
{
	drawMap(player);
	player.draw();
	drawBullets();
	drawEnemies();
	drawHud();
}