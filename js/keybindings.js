export function registerKeybindings() {
	game.keybindings.register("lite-ruler", "cancelDrag", {
		name: "lite-ruler.keybindings.cancelDrag",
		onDown: cancelDrag,
		editable: [{
			key: "End",
		}],
		precedence: -1,
	});

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

}

function cancelDrag() {
	const ruler = canvas.controls.ruler;
  const token = ruler.draggedToken
  ruler._endMeasurement();

    // Deactivate the drag workflow in mouse
    token.mouseInteractionManager._deactivateDragEvents();
    token.mouseInteractionManager.state = token.mouseInteractionManager.states.HOVER;

    // This will cancel the current drag operation
    // Pass in a fake event that hopefully is enough to allow other modules to function
    token._onDragLeftCancel(event);
  }


function deleteWaypoint() {
	if ((ruler._state === 2) && canvas.controls.ruler.waypoints.length > 1) {
		const mousePosition = canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.tokens)
		canvas.controls.ruler._removeWaypoint({x: mousePosition.x, y: mousePosition.y});
      return canvas.mouseInteractionManager._dragRight = false;
	}
	else {
		return canvas.controls.ruler._endMeasurement();
	}
	this._onDragLeftCancel();
}

function addWaypoint(){
  const snap = !event.shiftKey
  canvas.controls.ruler._addWaypoint(canvas.controls.ruler.destination, snap)
}
