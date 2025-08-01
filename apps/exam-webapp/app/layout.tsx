import "./globals.css";
import { Montserrat } from "next/font/google";
import { StyledRegistry, Providers } from "ui";
import { GoogleTagManager } from "@next/third-parties/google";

// Inject the .env file, validates the process.env values against a pre-defined schema.
import "./env";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "RoMS Scoring App",
	description: "RoMS Scoring App"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='gs'>
			<body className={montserrat.className}>
				<Providers>
					<StyledRegistry>{children}</StyledRegistry>
				</Providers>
				<GoogleTagManager gtmId='GTM-TR3TRZC8' />
			</body>
		</html>
	);
}
