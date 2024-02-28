import "./globals.css";
import { Montserrat } from "next/font/google";
import { StyledRegistry, Providers } from "ui";

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
			</body>
		</html>
	);
}
