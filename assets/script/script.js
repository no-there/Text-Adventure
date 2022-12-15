
// comments are overrated

let prefix 	= ["pickup", "punch", "inv", "pet", "stab", "read", "leave", "enter", "eat"]; 

let monster	= 100;
let health 	= 100;
let level 	= ""
let bread 	= false; 
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
		if (level == "") {
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
					document.getElementById("whiteSpace").currentTime = 0;

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
						document.getElementById("nyctophobia").currentTime = 0;
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
				room = "hallway";

				outputText("Before you leave your room, you grab a knife. You know, just in case. ");

				inv.push("knife");

				document.getElementById("calm").pause();
				document.getElementById("calm").currentTime = 0;

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
					}).type("The doors are locked.").go();

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
		} if (level == "hallway") {
			if (cmd[0] == "enter" && cmd[1] == "kitchen") {
				level = "kitchen";

				document.getElementById("calm").play();

				outputText("You entered the kitchen.");

				infoUpdate("location", "Kitchen");

				setTimeout(() => {
					outputText("You search the kitchen for food. There isn't much food left, but there is some bread.");
				}, 1000);

				setTimeout(() => {
					infoUpdate("objective", "Eat the bread.");
					infoUpdate("valid", "eat");
				}, 3000);
			}
		} if (level == "kitchen") {
			if (cmd[0] == "eat" && cmd[1] == "bread") {
				outputText("You eat the bread. It's stale, but it's better than nothing.");

				setTimeout(() => {
					outputText("You feel a little better.");
				}, 2000);

				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--border", "#000");
					document.querySelector(":root").style.setProperty("--color", "#000");
					document.querySelector(":root").style.setProperty("--info", "#000");
					document.querySelector(":root").style.setProperty("--box", "#000");
				}, 6000);

				setTimeout(() => {
					document.getElementById("textbox").innerHTML = "";
				}, 7000);

				setTimeout(() => {
					document.getElementById("calm").pause();
					
					document.querySelector(":root").style.setProperty("--color", "#fff");
				}, 8000);

				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--color", "#000");

					document.getElementById("background").style.display = "block";

					document.getElementById("credit").play();
				}, 13000);

				setTimeout(() => {
					document.getElementById("objective-box").style.display = "none";
					document.getElementById("location-box").style.display = "none";
					document.getElementById("valid-box").style.display = "none";
					document.getElementById("input").style.display = "none";

					document.getElementById("textbox").innerHTML = "";
				}, 16000);

				setTimeout(() => {
					document.querySelector(":root").style.setProperty("--color", "#fff");
				}, 17000);

				setTimeout(() => {
					outputText("Thank you for playing! I hope you enjoyed it. If you did, please consider sharing it with your friends. If you didn't, please consider sharing it with your enemies. Either way, I hope you have a great day! <3");
				}, 19000);

				setTimeout(() => {
					outputText("Credits:<br>・Entirely coded in JavaScript, HTML, and CSS by Deon Leggett<br>・Graphics from Omori<br>・Music from Omori<br>・Indie Flower font from Google Fonts");
				}, 23000);
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
		}, 7625);
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
			document.getElementById("location-box").style.display = "none";
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

			setTimeout(() => {
				document.getElementById("monster").classList.add("expand-bar");
				document.getElementById("health").classList.add("expand-bar");
			}, 1000);
			setTimeout(() => {
				document.getElementById("health").classList.add("bar-anim");
				document.getElementById("monster").classList .add("bar-anim");
				document.getElementById("health").classList.remove("expand-bar");
				document.getElementById("monster").classList.remove("expand-bar");
			}, 6000);
		}, 22000);
	} else if (shade == "dead") {
		document.getElementById("input").style.display = "none";

		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#f00");
		document.querySelector(":root").style.setProperty("--info", "#000");
		
		document.getElementById("death").play();

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--death", "#000");
		}, 5000);
	} else if (shade == "dead2") {
		document.getElementById("input").style.display = "none";

		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--info", "#000");
		
		document.getElementById("death").play();

		setTimeout(() => {
			document.getElementById("death-screen").style.display = "block";
		}, 5000);

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--death", "#fff");
		}, 7000);

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--death", "#000");
			
			document.getElementById("death-screen").style.opacity = 0;
		}, 50000);

		setTimeout(() => {
			document.querySelector(":root").style.setProperty("--death", "#000");
			
			document.getElementById("monster").style.display = "none";
		}, 60000);
	}
}

function attack() {
	if (health != 0 && health - 10 != 0) {
		health -= 10;
	} else if (health <= 0 || health - 10 <= 0) {
		document.getElementById("monster-bar-label").style.display = "none";
		document.getElementById("health-bar-label").style.display = "none";
		document.getElementById("monster-bar").style.display = "none";
		document.getElementById("health-bar").style.display = "none";
		document.getElementById("attack").style.display = "none";
		document.getElementById("input").style.display = "none";
		document.getElementById("cool").style.display = "none";

		document.getElementById("nyctophobia").pause();
		document.getElementById("nyctophobia").currentTime = 0;

		document.getElementById("monster-img").classList.remove("fadein-img");
		document.getElementById("monster-img").classList.add("fadeout-img");
		document.getElementById("death-img").classList.add("fadein-img");
		document.getElementById("death-img").style.display = "block";

		setTimeout(() => {
			document.getElementById("monster-img").style.display = "none";
		}, 7500);

		setTimeout(() => {
			document.getElementById("death-img").style.display = "none";
			
			shadeToggle("dead2");
		}, 10000);
	} if (monster != 100) {
		monster += 10;
	}

	document.getElementById("cool").style.opacity = (parseFloat(getComputedStyle(document.getElementById("cool")).getPropertyValue("opacity")) + 0.05);

	document.getElementById("monster").style.width = monster + "%";
	document.getElementById("health").style.width = health + "%";
}

function calm() {
	if (monster != 0 && monster - 10 != 0) {
		monster -= 10;
	} else if (monster <= 0 || monster - 10 <= 0) {
		document.getElementById("monster-bar-label").style.display = "none";
		document.getElementById("health-bar-label").style.display = "none";
		document.getElementById("monster-bar").style.display = "none";
		document.getElementById("health-bar").style.display = "none";
		document.getElementById("attack").style.display = "none";
		document.getElementById("input").style.display = "block";
		document.getElementById("cool").style.display = "none";
		
		document.getElementById("location-box").style.display = "block";

		document.getElementById("nyctophobia").pause();
		document.getElementById("nyctophobia").currentTime = 0;

		document.querySelector(":root").style.setProperty("--background", "#000");
		document.querySelector(":root").style.setProperty("--border", "#000");
		document.querySelector(":root").style.setProperty("--color", "#000");
		document.querySelector(":root").style.setProperty("--info", "#000");
		document.querySelector(":root").style.setProperty("--box", "#000");

		document.getElementById("monster-img").classList.remove("fadein-img");
		document.getElementById("monster-img").classList.add("fadeout-img");
		document.getElementById("omori-img").classList.add("fadein-img");
		document.getElementById("omori-img").style.display = "block";

		setTimeout(() => {
			document.getElementById("monster-img").style.display = "none";
		}, 7500);

		setTimeout(() => {
			level = "hallway";

			document.getElementById("omori-img").style.display = "none";

			infoUpdate("location", "");
			infoUpdate("objective", "");
			infoUpdate("valid", "");

			shadeToggle("dark");
		}, 10000);

		setTimeout(() => {
			outputText("Panting, you collapse to the floor. You're exhausted. You're alone. It's okay though. No one else is here.");
		}, 15000);

		setTimeout(() => {
			outputText("You start to slowly catch your breath, and your heart stops pounding your ears as if they're drums.");
		}, 20000);

		setTimeout(() => {
			outputText("You're still hungry. Enter the kitchen.");
		}, 23000);

		setTimeout(() => {
			infoUpdate("location", "Hallway");
			infoUpdate("objective", "Grab food from the kitchen");
			infoUpdate("valid", "enter");
		}, 24000);
	}

	document.getElementById("cool").style.opacity = (parseFloat(getComputedStyle(document.getElementById("cool")).getPropertyValue("opacity")) + 0.05);

	document.getElementById("monster").style.width = monster + "%";
	document.getElementById("health").style.width = health + "%";
}

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