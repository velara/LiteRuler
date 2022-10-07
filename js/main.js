import {registerSettings} from "./settings.js"
import {registerKeybindings} from "./keybindings.js"
export const MODULE_ID = "lite-ruler";

Hooks.once("init", () => {
	//Wait until the game is initialized, then register the settings created previously.
	registerSettings();
  registerKeybindings();
});

Hooks.once("libWrapper.Ready", async function() {
  if(game.settings.get(MODULE_ID, "liteRulerEnabled")) registerRuler();
});

function registerRuler() {
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftStart", beginLiteRuler, libWrapper.OVERRIDE);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftMove", onTokenLeftDragMove, libWrapper.WRAPPER);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftDrop", onTokenDragLeftDrop, libWrapper.WRAPPER);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftCancel", onTokenDragLeftCancel, libWrapper.WRAPPER);
}

function beginLiteRuler(event) {
	return canvas.controls.ruler._onDragStart(event);//};
}

function onTokenLeftDragMove(wrapper, event) {
		canvas.controls.ruler._onMouseMove(event)
		return wrapper(event);
}

function onTokenDragLeftDrop(wrapper, event) {
	const tokenStart = canvas.grid.grid.getGridPositionFromPixels(event.data.origin.x, event.data.origin.y);
	const tokenEnd = canvas.grid.grid.getGridPositionFromPixels(event.data.destination.x, event.data.destination.y)
	if (tokenStart.toString() !== tokenEnd.toString() && canvas.controls.ruler._state > 0) {
		const selectedTokens = canvas.tokens.placeables.filter(token => token._controlled);
		canvas.controls.ruler.moveToken(canvas.controls.ruler, selectedTokens)
	}
	return wrapper(event);
}

function onTokenDragLeftCancel(wrapper, event) {
	const ruler = canvas.controls.ruler;
	if ( (ruler._state === 2) && (ruler.waypoints.length > 1) ) {
		event.preventDefault();
		const mousePosition = canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.tokens)
	  ruler._removeWaypoint({x: mousePosition.x, y: mousePosition.y});
	  game.user.broadcastActivity({ruler: canvas.controls.ruler});
 }
	else ruler._endMeasurement();

	return wrapper(event);
	}
