import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "fr.ronicobilly.course",
	appName: "course",
	webDir: "dist",
	server: {
		androidScheme: "https",
	},
	plugins: {
		SplashScreen: {
			launchAutoHide: true,
			launchShowDuration: 0,
		},
	},
}

export default config
