import React from "react";
import Hero from "../../Components/Home/Hero";
import About from "../../Components/Home/About";
import MentorsWords from "../../Components/Home/MentorsWord";
import Team from "../../Components/Home/Team";
import CtaSection from "../../Components/Home/CtaSection";
import Faq from "../../Components/Home/Faq";
import Footer from "../../Components/Home/Footer";
import CrispScript from "../../Components/Home/Crisp";

const Home = () => {
	return (
		<>
			<CrispScript />
			<Hero />
			<About />
			<MentorsWords />
			<Team />
			<CtaSection />
			<Faq />
			<Footer />
		</>
	);
};

export default Home;
