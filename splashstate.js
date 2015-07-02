var SplashState = function()
{
this.prototype = BaseState;
}
SplashState.prototype.load = function()
{
}
SplashState.prototype.unload = function() 
{
}
SplashState.prototype.update = function(dt) 
{
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true )
	{
		stateManager.switchState(new GameState());
	}
}
	splashImage = document.createElement("img");
	splashImage.src = "splashscreen.png";    
SplashState.prototype.draw = function()
{
	context.drawImage(splashImage, 0, 0);
}