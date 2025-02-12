const presence = new Presence({
		clientId: "1333435652489871450",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://pokemongodeathtracker.com/android-chrome-512x512.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		type: 3,
	};

	presenceData.details = `${
		document.querySelector("#deaths").textContent
	} Deaths`;
	presenceData.state = `${
		document.querySelector("#injuries").textContent
	} Injuries`;

	const sources = document.querySelectorAll<HTMLAnchorElement>("#sources a"),
		honorables = document.querySelectorAll<HTMLAnchorElement>("#honorables a");

	Math.random();

	presenceData.buttons = [
		{
			label: "Random Source",
			url: sources[Math.floor(Math.random() * sources.length)].href,
		},
		{
			label: "Random Honorable Mention",
			url: honorables[Math.floor(Math.random() * honorables.length)].href,
		},
	];

	presence.setActivity(presenceData);
});
