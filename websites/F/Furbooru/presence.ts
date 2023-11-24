const presence = new Presence({
		clientId: "850917856215826494",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/78XkegQ.png",
}

presence.on("UpdateData", async () => {
	const [time, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

	switch (pathname.split("/")[1]) {
		case "images": {
			if (pathname.split("/")[2] === "new")
				presenceData.details = "Uploading image";
			else {
				presenceData.details = `Viewing ${document
					.querySelector(".image-show-container")
					.getAttribute("data-image-id")}`;
				if (document.querySelector("span[data-tag-name='safe']")) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>("#image-display").src;
					presenceData.buttons = [
						{
							label: "View Page",
							url: href,
						},
					];
				}
			}
			break;
		}
		case "": {
			presenceData.details = "Browsing homepage";
			break;
		}
		case "activity": {
			presenceData.details = "Browsing activity";
			break;
		}
		case "comments": {
			presenceData.details = "Browsing comments";
			break;
		}
		case "tags": {
			presenceData.details = "Browsing tags";
			break;
		}
		case "channels": {
			presenceData.details = "Browsing livestreams";
			break;
		}
		case "galleries": {
			if (!pathname.split("/")[2]) presenceData.details = "Browsing galleries";
			else if (pathname.split("/")[2] === "new")
				presenceData.details = "Creating gallery";
			else {
				presenceData.details = "Viewing gallery";
				presenceData.state = document.querySelector(
					".page__title strong"
				).textContent;
			}
			break;
		}
		case "commissions": {
			presenceData.details = "Browsing commissions";
			break;
		}
		case "forums": {
			if (pathname.split("/")[3] === "topics") {
				presenceData.details = "Viewing topic";
				presenceData.state = document.querySelector("h1").textContent;
			} else {
				presenceData.details = "Browsing forums";
				presenceData.state = document.querySelector("h1").textContent;
			}
			break;
		}
		case "profiles": {
			if (!pathname.split("/")[3]) {
				presenceData.details = "Viewing profile";
				presenceData.state = document.querySelector(
					".profile-top__name-header"
				).textContent;
			} else {
				presenceData.details = "Viewing profile";
				presenceData.state = document.querySelector("h1").textContent;
			}
			break;
		}
		case "search": {
			presenceData.details = "Searching images";
			break;
		}
		case "conversations": {
			presenceData.details = "Viewing conversations";
			break;
		}
		case "notifications": {
			presenceData.details = "Viewing notifications";
			break;
		}
		case "posts": {
			presenceData.details = "Browsing posts";
			break;
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (!covers) presenceData.largeImageKey = Assets.Logo;

	presence.setActivity(presenceData);
});
