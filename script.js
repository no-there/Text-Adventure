let prefix = ["pickup", "punch", "inv", "pet", "stab", "read", "toggle"];// valid instructions
let rooms = ["bedroom", "stairs", "kitchen"]; // valid rooms / levels
let items = ["knife", "bat", "steak"]; // items
let steak = false; // true when steak is cooked
let level = ""; // set to current room / level
let bulb = false; // check if bulb is shattered
let ken = true; // check if ken is present
let inv = []; // items in inventory

function intro() {
	setTimeout(() => {
		document.querySelector(":root").style.setProperty("--intro", "#000");
	}, 1000);
	setTimeout(() => {
		document.querySelector(":root").style.setProperty("--intro", "#fff");
	}, 6000);
	setTimeout(() => {
		document.getElementById("intro").style.display = "none";
	}, 8000);
	setTimeout(() => {
		document.querySelector(":root").style.setProperty("--color", "#000");

		var title = document.createElement("h1");

		new TypeIt(textbox.appendChild(title), {
			cursor: false,
			speed: 10,
		}).type("Steak Adventure").go();

		title.scrollIntoView();

		if (document.cookie != "audio=true") {
			setTimeout(() => {
				outputText("<b>Before proceeding, please ensure you have audio enabled for the full experience. To enable, click the lock, then open site settings and select sound/autoplay and force allow it. Afterwards, please reload the page.</b>");

				document.cookie = "audio=true";
			}, 1000);
		} else {
			setTimeout(() => {
				outputText("You are in a white room. You gaze around. There’s a light hanging above your head, and it’s pitch black on the inside. Ken, your cat, and a kitchen knife are sitting next to you. Find a way out.");
			}, 2000);

			setTimeout(() => {
				document.querySelector(":root").style.setProperty("--border", "#000");
				document.querySelector(":root").style.setProperty("--info", "#000");

				setTimeout(() => {
					infoUpdate("location", "White Space");
					infoUpdate("objective", "Find a way out.")
					infoUpdate("valid", "pickup<br>punch<br>inv<br>pet");
				}, 2000);
				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--box", "#000");
				}, 4000);
				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--box", "#000");
				}, 5000);

				setTimeout(() => {
					new TypeIt(document.getElementById("input"), {
						cursor: false,
						speed: 10,
					}).type("Type commands out here. Supported commands are listed in the valid commands box in the top right. Use the format action + object. Example: pet Ken - Don't worry - I'll disappear in about 5s...").pause(5000).delete().go();
				}, 6000);
			}, 6000);
		}

	}, 10000);
}

function checkInput(e) {

	// fetches player input to process and clears the box 

	if (e.key == "Enter") {
		command = input.textContent;
		input.innerHTML = "";
		inputProcessor(command);
		e.preventDefault();
	}
}

function inputProcessor(input) {

	// process user input to run each function / proceed through the game

	if (input == "inv") {

		// list items in inventory

		if (inv.length == 0) {

			// inventory has nothing in it

			outputText("Your inventory is empty.");
		} else {

			// list items using unordered list

			outputText("You opened your backpack and found:");

			inv.forEach((entry, index) => {
				setTimeout(() => {
					outputText("	・a " + entry);
				}, 800 * (index + 1));
			});
		}
	}

	let cmd = input.split(" ");

	cmd[0] = cmd[0].toLowerCase();
	cmd[1] = cmd[1].toLowerCase();

	if (prefix.includes(cmd[0])) {
		if (cmd[0] == "toggle" && cmd[1] == "dark") {

			// force overrides page color to dark screen

			outputText("Overriding default and forcing dark mode.");
			shadeToggle("dark");
		}
		if (cmd[0] == "toggle" && cmd[1] == "light") {

			// force overrides page color to light screen

			outputText("Overriding default and forcing light mode.");
			shadeToggle("light");
		}
		if (cmd[0] == "toggle" && cmd[1] == "dead") {

			// force overrides page color to dead screen

			outputText("Overriding default and forcing dead mode.");
			shadeToggle("dead");
		}
		if (level == "") {

			// first stage of the game 

			if (cmd[0] == "pickup" && cmd[1] == "knife") {
				if (inv.includes("knife")) {
					outputText("You couldn't find another knife. Hint: You already picked up the knife.");
				} else {
					if (ken == true) {
						infoUpdate("valid", "pickup<br>punch<br>stab<br>inv<br>pet");
					} else {
						infoUpdate("valid", "punch<br>stab<br>inv");
					}
					outputText("You picked up the knife.");
					inv.push("knife");
				}
			}

			if (cmd[0] == "pickup" && cmd[1] == "ken") {
				if (ken == true) {
					outputText("You tried to pickup Ken, but he ran away. Bloody cats.");
					ken = false;
					if (inv.includes("knife")) {
						infoUpdate("valid", "punch<br>stab<br>inv");
					} else {
						infoUpdate("valid", "pickup<br>punch<br>inv");
					}
				} else {
					outputText("Ken ran away earlier.");
				}
			}

			if (cmd[0] == "punch" && (cmd[1] == "bulb" || cmd[1] == "light")) {
				if (bulb == false) {
					outputText("You punch the light. The light shatters everywhere, but the room remains lit. That hurt. Why did you do that?");
					bulb = true;
				} else {
					outputText("The bulb is already shattered.");
				}
			}

			if (cmd[0] == "punch" && cmd[1] == "ken") {
				if (ken == true) {
					outputText("You considered punching Ken. You psychopath. Why would you do that?");
				} else {
					outputText("Ken ran away earlier.");
				}
			}

			if (cmd[0] == "pet" && cmd[1] == "ken") {
				if (ken == true) {
					outputText("Prrrr.");
				} else {
					outputText("Ken ran away earlier.");
				}
			}

			if (cmd[0] == "stab" && inv.includes("knife")) {
				if (cmd[1] == "ken") {
					if (ken == true) {
						outputText("You considered stabbing Ken. What the hell is wrong with you?");
					} else {
						outputText("Ken ran away earlier.");
					}
				} else if (cmd[1] == "me") {
					level = "bedroom";

					outputText("The knife sinks in...");

					document.getElementById("whiteSpace").pause();
					document.getElementById("nyctophobia").play();

					setTimeout(() => {
						shadeToggle("wake");
					}, 1000);

					setTimeout(() => {
						document.getElementById("textbox").innerHTML = "";

						infoUpdate("location", "");
						infoUpdate("objective", "");
						infoUpdate("valid", "");
					}, 4000);

					setTimeout(() => {
						shadeToggle("dark");
						document.getElementById("nyctophobia").pause();
						document.getElementById("calm").play();
					}, 15000);

					setTimeout(() => {
						outputText("You wake up suddenly.");
					}, 16000);

					setTimeout(() => {
						outputText("It was just a dream. It's dark. There's the small pitter patter from rain on your window and a faint glow from the moon trickles into your bedroom.  As you start to calm down, you notice there's a note next to you on your bedside table.");
					}, 18000);

					setTimeout(() => {
						infoUpdate("location", "Your Bedroom");
						infoUpdate("objective", "Read the note");
						infoUpdate("valid", "read");
					}, 22000);
				}
			}
		} if (level == "bedroom") {

			// level 2 - bedroom 

			if (cmd[0] == "read" && (cmd[1] == "note" || cmd[1] == "letter")) {

					var text = document.createElement("p");
					text.classList.add("textbox-write");

					new TypeIt(textbox.appendChild(text), {
						cursor: false,
						speed: 10,
					}).type("<br>It's mommy. I can't wait for you to join me in the new home! <br>With just the two of us, it will be wonderful. Sadly, the energy <br>company might cut our power to the old home in the night <br> as it is taking the men with a van longer than they said <br> to move. If you wake up in the night, remember there <br> aren't any monsters, all you need to do is calm down.<br><br> Love, mommy <3<br>").go();
				
					text.scrollIntoView();

					setTimeout(() => {
						outputText("Your stomach growls aggressively. You're hungry. Go downstairs and find a snack. Hint: You don't need to specify an object to interact with to leave the room.")
					}, 6000);

					setTimeout(() => {
						infoUpdate("objective", "Find something to eat.");
						infoUpdate("valid", "leave");
					}, 7000);
			}
		}
	} else if (cmd[1] == null) {

		// no  object

		outputText("Command format not recognised. Need action + object. Example: pet Ken")
	} else {

		// error handler

		outputText("Instruction not recognised. Check it is a valid command.")
	}
}

function shadeToggle(shade) {

	// manages page colour

	if (shade == "dark") {
		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#fff");
		document.querySelector(":root").style.setProperty("--color", "#fff");
		document.querySelector(":root").style.setProperty("--info", "#fff");
		document.querySelector(":root").style.setProperty("--box", "#fff");
	} else if (shade == "light") {
		document.querySelector(":root").style.setProperty("--background", "#fff");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#000");
		document.querySelector(":root").style.setProperty("--info", "#000");
		document.querySelector(":root").style.setProperty("--box", "#000");
	} else if (shade == "wake") {
		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#f00");
		document.querySelector(":root").style.setProperty("--info", "#000");
		document.querySelector(":root").style.setProperty("--box", "#000");

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--color", "#000");
		}, 2000);
	} else if (shade == "fight") {
		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#f00");
		document.querySelector(":root").style.setProperty("--info", "#000");
		document.querySelector(":root").style.setProperty("--box", "#000");
	} else if (shade == "dead") {
		document.getElementById("input").style.display = "none";

		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#f00");
		document.querySelector(":root").style.setProperty("--info", "#000");

		document.getElementById("whiteSpace").pause();
		document.getElementById("nyctophobia").play();

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--color", "#000");
		}, 5000);
	}
}

function infoUpdate(box, info) {

	// updates info boxes at top with cool animation

	document.getElementById(box).textContent = "";

	new TypeIt(document.getElementById(box), {
		cursor: false,
		speed: 10,
	}).type(info).go();
}

function outputText(txt) {

	// add text to a new paragraph, append to textbox with cool type animation and scroll down to it

	var text = document.createElement("p");

	new TypeIt(textbox.appendChild(text), {
		cursor: false,
		speed: 10,
	}).type(txt).go();

	text.scrollIntoView();
}