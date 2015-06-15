var MenuState = function() 
{
this.prototype = BaseState;
}

MenuState.prototype.load = function() 
{
	this.selection = 1;
	this.highlightY = 0;
	this.menuLayout = document.createElement("img");
	this.menuLayout.src = "menuLayout.png";	
	this.menuHighlight = document.createElement("img");
	this.menuHighlight.src = "menuHighlight.png";
}

MenuState.prototype.unload = function() 
{
}

MenuState.prototype.update = function(dt) 
{
	Keyboard.prototype.onKeyDown = function(evt)
	{
		switch (event.keyCode)
		{
			case keyboard.KEY_SPACE:
				switch(this.selection)
				{
				case 1:

					stateManager.switchState(new GameState());
					
				break;
				case 2:

					stateManager.switchState(new HelpState());

				break;		
				case 3:

					stateManager.switchState(new SplashState());

				break;		
				}
			break;
			case keyboard.KEY_S:
				if(this.selection < 3)
				{
					this.selection++
				}
				else
				{
					this.selection = 1;
				}
			break;
			case keyboard.KEY_W:
				if(this.selection > 1)
				{
					this.selection--
				}
				else
				{
					this.selection = 3;
				}
			break;
		}
	}
}
MenuState.prototype.draw = function() 
{
	context.drawImage(this.menuLayout, 0, 0);
	this.highlightY = 6+((this.selection-1) * 200);
	context.drawImage(this.menuHighlight, 204, this.highlightY);
}