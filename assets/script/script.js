
// comments are overrated

let prefix 	= ["pickup", "punch", "inv", "pet", "stab", "read", "toggle", "leave"]; 
let health 	= 100;
let level 	= ""
let steak 	= false; 
let note 	= false;
let bulb 	= false; 
let ken 	= true; 
let inv 	= []; 

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

		if (document.cookie != "audio=true") {
			var text = document.createElement("h1");

			text.style.fontSize = "25px";

			new TypeIt(textbox.appendChild(text), {
				cursor: true,
				speed: 10,
			}).type("Before proceeding, please ensure you have audio enabled for the full experience. To enable, click the lock, then open site settings and select sound/autoplay and force allow it. Afterwards, please reload the page.").go();

			text.scrollIntoView();

			document.cookie = "audio=true";
		} else {
			outputText("You are in a white room. You look around. There's a light hanging above your head, but it's pitch black on the inside. Weird. Ken, your cat purrs loudly at you. There's knife lying on the floor next to you. Find a way out.");

			setTimeout(() => {
				document.querySelector(":root").style.setProperty("--border", "#000");
				document.querySelector(":root").style.setProperty("--info", "#000");
				
				outputText("Type commands below. Supported commands are listed in valid box in top right. Use the format action + object. Example: Pet Ken");

				setTimeout(() => {
					infoUpdate("location", "White Space");
					infoUpdate("objective", "Find a way out.");
					infoUpdate("valid", "pickup<br>punch<br>inv<br>pet");
				}, 1000);

				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--box", "#000");
				}, 3000);
			}, 6000);
		}

	}, 10000);
}

function checkInput(e) {
	if (e.key == "Enter") {
		command = input.textContent;
		input.innerHTML = "";
		inputProcessor(command);
		e.preventDefault();
	}
}

function inputProcessor(input) {
	if (input == "inv") {
		if (inv.length == 0) {
			outputText("Your inventory is empty.");
		} else {
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
			outputText("Overriding default and forcing dark mode.");
			shadeToggle("dark");
		} if (cmd[0] == "toggle" && cmd[1] == "light") {

			outputText("Overriding default and forcing light mode.");
			shadeToggle("light");
		} if (cmd[0] == "toggle" && cmd[1] == "fight") {

			outputText("Overriding default and forcing fight mode.");
			shadeToggle("fight");
		} if (cmd[0] == "toggle" && cmd[1] == "dead") {

			outputText("Overriding default and forcing dead mode.");
			shadeToggle("dead");
		} if (level == "") {
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
			} if (cmd[0] == "pickup" && cmd[1] == "ken") {
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
			} if (cmd[0] == "punch" && (cmd[1] == "bulb" || cmd[1] == "light")) {
				if (bulb == false) {
					outputText("You punch the light. The light shatters everywhere, but the room remains lit. That hurt. Why did you do that?");
					bulb = true;
				} else {
					outputText("The bulb is already shattered.");
				}
			} if (cmd[0] == "punch" && cmd[1] == "ken") {
				if (ken == true) {
					outputText("You considered punching Ken. You psychopath. Why would you do that?");
				} else {
					outputText("Ken ran away earlier.");
				}
			} if (cmd[0] == "pet" && cmd[1] == "ken") {
				if (ken == true) {
					outputText("Prrrr.");
				} else {
					outputText("Ken ran away earlier.");
				}
			} if (cmd[0] == "stab" && inv.includes("knife")) {
				if (cmd[1] == "ken") {
					if (ken == true) {
						outputText("You considered stabbing Ken. What the hell is wrong with you?");
					} else {
						outputText("Ken ran away earlier.");
					}
				} else if (cmd[1] == "me" || cmd[1] == "myself") {
					level = "bedroom";

					outputText("The knife sinks in...");

					inv = [];

					document.getElementById("whiteSpace").pause();

					setTimeout(() => {
						shadeToggle("wake");
					}, 1000);

					setTimeout(() => {
						document.getElementById("nyctophobia").play();

						document.getElementById("textbox").innerHTML = "";

						infoUpdate("location", "");
						infoUpdate("objective", "");
						infoUpdate("valid", "");
					}, 4000);

					setTimeout(() => {
						document.getElementById("nyctophobia").pause();
					}, 12970);

					setTimeout(() => {
						shadeToggle("dark");
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
					}, 25000);
				}
			}
		} if (level == "bedroom") {
			if (cmd[0] == "read" && (cmd[1] == "note" || cmd[1] == "letter")) {
					note = true;

					var text = document.createElement("p");
					text.classList.add("textbox-write");

					new TypeIt(textbox.appendChild(text), {
						cursor: false,
						speed: 15,
					}).type("<br>It's mommy. I can't wait for you to join me in the new home! <br>With just the two of us, it will be wonderful. Sadly, the energy <br>company might cut our power to the old home in the night <br> as it is taking the men with a van longer than they said <br> to move. If you wake up in the night, remember there <br> aren't any monsters, all you need to do is calm down.<br><br> Love, mommy <3<br>").go();
				
					text.scrollIntoView();

					setTimeout(() => {
						outputText("Your stomach growls aggressively. You're hungry. Leave your bedroom, and find something to eat in the kitchen.");
					}, 10000);

					setTimeout(() => {
						infoUpdate("objective", "Find something to eat.");
						infoUpdate("valid", "leave");
					}, 11000);
			} if (cmd[0] == "leave" && (cmd[1] == "room" || cmd[1] == "bedroom") && note == true) {
				room = "stairs";

				outputText("Before you leave your room, you grab a knife.");

				inv.push("knife");

				document.getElementById("calm").pause();

				document.getElementById("input").style.display = "none";
				
				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--border", "#000");
					document.querySelector(":root").style.setProperty("--color", "#000");
					document.querySelector(":root").style.setProperty("--info", "#000");
					document.querySelector(":root").style.setProperty("--box", "#000");

				}, 5000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
				}, 6000);
				
				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--color", "#fff");
				}, 7000);

				setTimeout(() => {
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 20,
					}).type("It's dark and eerie in the hallway.").go();

					text.scrollIntoView();
				}, 8000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 20,
					}).type("Don't panic.").go();

					text.scrollIntoView();
				}, 11000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 40,
					}).type("Nothing to fear.").go();

					text.scrollIntoView();
				}, 15000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 60,
					}).type("You're safe.").go();

					text.scrollIntoView();
				}, 19000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 80,
					}).type("No one else is here.").go();

					text.scrollIntoView();
				}, 23000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 100,
					}).type("You're alone.").go();

					text.scrollIntoView();
				}, 27000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					var text = document.createElement("p");

					new TypeIt(textbox.appendChild(text), {
						cursor: true,
						speed: 120,
					}).type("It'll be okay.").go();

					text.scrollIntoView();
				}, 31000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
					document.getElementById("nyctophobia").play();
					shadeToggle("fight");
				}, 39000);
			}
		}
	}
}

function shadeToggle(shade) {
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
		setTimeout(() => {
			document.getElementById("stabbed").style.display = "block";
		}, 7500);
		setTimeout(() => {
			document.getElementById("stabbed").style.display = "none";
		}, 12000);
	} else if (shade == "fight") {
		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#000");
		document.querySelector(":root").style.setProperty("--info", "#000");
		document.querySelector(":root").style.setProperty("--box", "#000");

		setTimeout(() => {
			document.getElementById("monster-img").style.display = "block";
			document.getElementById("monster-img").classList.add("fadein-img");
		}, 5000);

		setTimeout(() => {
			document.getElementById("monster-bar-label").style.display = "block";
			document.getElementById("monster-bar-label").classList.add("fadein");
			document.getElementById("health-bar-label").style.display = "block";
			document.getElementById("health-bar-label").classList.add("fadein");
			document.getElementById("monster-bar").style.display = "block";
			document.getElementById("monster-bar").classList.add("fadein");
			document.getElementById("health-bar").style.display = "block";
			document.getElementById("health-bar").classList.add("fadein");

			document.getElementById("attack").style.display = "block";
			document.getElementById("attack").classList.add("fadein");
			document.getElementById("cool").style.display = "block";
		}, 22000);
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

function attack() {}

function calm() {}

function infoUpdate(box, info) {
	document.getElementById(box).textContent = "";

	new TypeIt(document.getElementById(box), {
		cursor: false,
		speed: 10,
	}).type(info).go();
}

function outputText(txt) {
	var text = document.createElement("p");

	new TypeIt(textbox.appendChild(text), {
		cursor: false,
		speed: 10,
	}).type(txt).go();

	text.scrollIntoView();
}