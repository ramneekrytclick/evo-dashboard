import NoSsr from "@/utils/NoSsr";
import MainProvider from "./MainProvider";
import "../../src/index.scss";
import { Lexend, Roboto, Poppins, Outfit } from "next/font/google";
import { detectLanguage } from "./i18n/server";
import { I18nProvider } from "./i18n/i18n-context";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "@/CommonComponent/ErrorBoundry";

const lexend = Lexend({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal"],
	subsets: ["latin"],
	display: "swap",
});

const roboto = Outfit({
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["normal"],
	subsets: ["latin"],
	display: "swap",
});
export const generateMetadata = () => ({
	title: {
		default: "EVO Portal",
		template: "%s | EVO Learning Platform",
	},
	description:
		"EVO is a modern learning and job platform for students, mentors, employers, and creators.",
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const lng = await detectLanguage();

	return (
		<I18nProvider language={lng}>
			<html>
				<head>
					<link
						rel='icon'
						href='/assets/images/evologo.png'
						type='image/x-icon'
					/>
					<link
						rel='shortcut icon'
						href='/assets/images/evologo.png'
						type='image/x-icon'
					/>
					<title>Evo Portal</title>
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin=''
					/>
					<script
						async
						src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0'></script>
				</head>
				<body
					suppressHydrationWarning={true}
					className={roboto.className}>
					<ErrorBoundary>
						<NoSsr>
							<MainProvider>{children}</MainProvider>
							<ToastContainer
								position='top-center'
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable={false}
								pauseOnHover={false}
								theme='colored'
								transition={Slide}
							/>
						</NoSsr>
					</ErrorBoundary>
				</body>
			</html>
		</I18nProvider>
	);
}
