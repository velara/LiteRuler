export function registerKeybindings() {

	game.keybindings.register("lite-ruler", "createWaypoint", {
		name: "lite-ruler.keybindings.createWaypoint",
		onDown: addWaypoint,
		editable: [{
			key: "Insert"
		}],
		precedence: -1,
	});

	game.keybindings.register("lite-ruler", "createWaypoint2", {
		name: "lite-ruler.keybindings.createWaypoint2",
		onDown: addWaypoint,
		editable: [{
			key: "ControlLeft"
		}],
		precedence: -1,
	});

	game.keybindings.register("lite-ruler", "deleteWaypoint", {
		name: "lite-ruler.keybindings.deleteWaypoint",
		onDown: deleteWaypoint,
    editable: [{
			key: "Home"
		}],
		precedence: -1,
	});

	game.keybindings.register("lite-ruler", "toggleLiteRuler", {
		name: "lite-ruler.keybindings.toggleLiteRuler",
		onDown: toggleLiteRuler,
		editable: [{
			key: "End"
		}],
		precedence: -1,
	});

}

function deleteWaypoint() {
	const ruler = canvas.controls.ruler;
	if ( (ruler._state === 2) && (ruler.waypoints.length > 1) ) {
		ruler._removeWaypoint()
	  this._onDragLeftCancel();
 }
	else ruler._endMeasurement();
	this._onDragLeftCancel();
}

function addWaypoint(){
  const snap = !event.shiftKey
  canvas.controls.ruler._addWaypoint(canvas.controls.ruler.destination, snap)
}

function toggleLiteRuler(){
if(game.settings.get("lite-ruler", "liteRulerDisabled")){game.settings.set("lite-ruler", "liteRulerDisabled", false)}
else {game.settings.set("lite-ruler", "liteRulerDisabled", true)}
}
