//import {handleCompleteAction} from "./main.js"
export function registerSettings() {
	// Create the setting for Automatic Movement switching for later use.
	game.settings.register("lite-ruler", "liteRulerEnabled", {
		name: "Disable Lite Ruler",
		hint: "Disables Lite Ruler's Functionality",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
})
};
