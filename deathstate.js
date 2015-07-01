var DeathState = function()
{
this.prototype = BaseState;
}
DeathState.prototype.load = function()
{
}
DeathState.prototype.unload = function() 
{
}
DeathState.prototype.update = function(dt) 
{
}
DeathState.prototype.draw = function()
{
	context.font="72px Verdana";
	context.fillStyle = "#FF0";
	var width = context.measureText("GAME OVER").width;
	context.fillText("GAME OVER", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);
}