import {registerKeybindings} from "./keybindings.js"
export const MODULE_ID = "lite-ruler";

Hooks.once("init", () => {
	//Wait until the game is initialized, then register the settings created previously.
  registerKeybindings();
  game.settings.register("lite-ruler", "liteRulerDisabled", {
		name: "Disable Lite Ruler",
		hint: "Disables Lite Ruler's Functionality",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
});
});

Hooks.once("libWrapper.Ready", async function() {
  registerRuler();
});

function registerRuler() {
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftStart", beginLiteRuler, libWrapper.WRAPPER);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftMove", onTokenLeftDragMove, libWrapper.WRAPPER);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftDrop", onTokenDragLeftDrop, libWrapper.WRAPPER);
	libWrapper.register(MODULE_ID, "Token.prototype._onDragLeftCancel", onTokenDragLeftCancel, libWrapper.WRAPPER);
}

function beginLiteRuler(wrapper, event) {
if(game.settings.get("lite-ruler", "liteRulerDisabled")){return wrapper(event)}
  else canvas.controls.ruler._onDragStart(event);
  return wrapper(event);

}

function onTokenLeftDragMove(wrapper, event) {
  if(game.settings.get("lite-ruler", "liteRulerDisabled")){return wrapper(event)}
    else canvas.controls.ruler._onMouseMove(event)
	return wrapper(event);
}

function onTokenDragLeftDrop(wrapper, event) {
  if(game.settings.get("lite-ruler", "liteRulerDisabled")){return wrapper(event)}
    else canvas.controls.ruler.moveToken(event)
	return wrapper(event);
}

function onTokenDragLeftCancel(wrapper, event) {
  if(game.settings.get("lite-ruler", "liteRulerDisabled")){return wrapper(event)}
    else {const ruler = canvas.controls.ruler;
	if ( (ruler._state === 2) && (ruler.waypoints.length > 1) ) {
		ruler._removeWaypoint()
    return wrapper(event);
 }
	else ruler._endMeasurement();
  return wrapper(event);
	}
}
