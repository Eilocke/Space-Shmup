var WinState = function()
{
this.prototype = BaseState;
}
WinState.prototype.load = function()
{
}
WinState.prototype.unload = function() 
{
}
WinState.prototype.update = function(dt) 
{
}
WinState.prototype.draw = function()
{
	context.font="72px Verdana";
	context.fillStyle = "#FF0";
	var width = context.measureText("YOU WIN").width;
	context.fillText("YOU WIN", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);
}