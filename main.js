var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

	// This is where constants get dumped
var keyboard = new Keyboard();
var v2Handler = new Vector2();
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
var BASE_SHIP_ACCEL = 500;
var BASE_DRAG = 250;
var BASE_MAXSPEED = 200;
var CRUISE_SPEED = 250;
var BULLET_SPEED = 5;
var AI_NONE = 0;

	// And some variables...
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
var dt = getDeltaTime();

	// Defines sound effects (using howler)
	musicBackground = new Howl(
	{
		urls: ["Reformat.mp3"],
		loop: true,
		buffer: true,
		volume: 0.5
	});
	sfxFire = new Howl(
	{
		urls: ["shoot.mp3"],
		buffer: true,
		volume: 0.2,
		onend: function(){
			isSfxPlaying = false;
		}
	});
	sfxEnergy = new Howl(
	{
		urls: ["energy.wav"],
		buffer: true,
		volume: 0.3,
		onend: function(){
			isSfxPlaying = false;
		}
	});	
	sfxBoom = new Howl(
	{
		urls: ["explosion.wav"],
		buffer: true,
		volume: 0.3,
		onend: function(){
			isSfxPlaying = false;
		}
	});	
	// Limits inputs to a minimum and maximum.
function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
}

	// Starting up the state manager
var stateManager = new StateManager();
stateManager.pushState(new SplashState());

function run()
{
	
	dt = getDeltaTime();
	context.fillStyle = "#100012";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	stateManager.update(dt);
	stateManager.draw();

		// update the frame counter 
	fpsTime += dt;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}	
		// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 1160, 20, 100);
	
}
//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
