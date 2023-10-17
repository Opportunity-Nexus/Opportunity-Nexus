import React from "react";
import Testimonial from "./Testimonial";
import testimonials from "../TestimonialData";
import Team from "./Team";
import logo from "../Assets/logo.png";
import choose1logo from "../Assets/chooseImg1.png";
import choose2logo from "../Assets/chooseImg2.png";
import choose3logo from "../Assets/chooseImg3.png";
import appImg from "../Assets/appinfo.png";
import HeroBanner from "../Assets/Hero--Banner.png";
import "../Styles/Home.css";

export default function Home() {
	return (
		<>
			<nav className="home--nav">
				<img className="nav--logo" src={logo} alt="logo" />
				<div className="nav--option">
					<span className="nav--option--name">Home</span>
					<span className="nav--option--name">About</span>
					<span className="nav--option--name">ConnectWithUs</span>
					<span className="nav--option--name">Sign In</span>
					<button>SignUp</button>
				</div>
			</nav>
			<section className="hero--section">
				<div>
					<h3 className="hero--text">
						Unlock Your Potential with OpportunityNexus <br /> Where
						Opportunities Meet Ambition
					</h3>
					<button>Unlock your future</button>
				</div>
				<div className="hero--banner--conatiner">
					<img
						className="hero--banner--img"
						src={HeroBanner}
						alt="HeroBanner"
					/>
				</div>
			</section>
			<h1 data-aos="zoom-in" className="AboutUs">
				About Us
			</h1>
			<section className="home--about">
				<div data-aos="zoom-in" className="home--about--content">
					<h5 className="home--about--content--heading">
						Our Commitment: Connecting Ambition to Achievement
					</h5>
					<p className="home--about--content--para">
						At OpportunityNexus, we bridge the gap between ambition and
						achievement.Explore a world of possibilities with OpportunityNexus.
						We offer a diverse range of services, from internship opportunities
						to scholarship listings, designed to empower your professional and
						educational journey.Experience the power of choice with
						OpportunityNexus. Our portal simplifies your search for career
						advancement and learning opportunities, putting you in control of
						your future.it's your partner in growth. With our comprehensive
						suite of services, you can navigate your path to success with
						confidence and clarity.
					</p>
				</div>
			</section>
			<section className="testimonials">
				<h2 data-aos="zoom-in">What Students Say About Us</h2>
				<div className="testimonial-container">
					{testimonials.map((testimonial, index) => (
						<Testimonial
							key={index}
							name={testimonial.name}
							image={testimonial.image}
							text={testimonial.text}
						/>
					))}
				</div>
			</section>
			<section className="home--chooseus">
				<div className="chooseus--box-1">
					<h2 data-aos="zoom-in" className="home--chooseus--heading">
						Why you choose us ?{" "}
					</h2>
					<p className="home--chooseus--para">
						When the life too much things you need more than you have. Let
						oppNexus help your life to easier with smart system
					</p>
				</div>
				<div data-aos="zoom-in" className="chooseus--box-2">
					<div className="choose--item">
						<img
							className="choose--item--img"
							src={choose1logo}
							alt="choose1logo"
						/>
						<h5 className="choose--item--heading">OnePlaceHub</h5>
						<p className="choose--item--para">
							Say goodbye 👋 to the hassle of switching between multiple
							applications – with us,into one user-friendly interface.
						</p>
					</div>
					<div className="choose--item">
						<img
							className="choose--item--img"
							src={choose2logo}
							alt="choose2logo"
						/>
						<h5 className="choose--item--heading">ZeroCost</h5>
						<p className="choose--item--para">
							we take pride in our commitment to offering a fee-free experience
							for our users.
						</p>
					</div>
					<div className="choose--item">
						<img
							className="choose--item--img"
							src={choose3logo}
							alt="choose3logo"
						/>
						<h5 className="choose--item--heading">DataGuardians</h5>
						<p className="choose--item--para">
							Trust is the foundation of our platform, and we prioritize the
							protection of your sensitive information
						</p>
					</div>
				</div>
			</section>
			<section className="home--appinfo">
				<div data-aos="flip-left" className="app--detail">
					<h3 className="app--detail--heading">
						Use opportunityNexus In Mobile
					</h3>
					<p className="app--detail--para">
						We already support in multiple platform to provide the best
						experiences, allow you to control the flow of your profile with no
						more efforts. Let’s make the world easy to life{" "}
					</p>
					<div className="btn--container">
						<button class="button">
							<svg
								stroke="#ffffff"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#ffffff"
							>
								<g stroke-width="0" id="SVGRepo_bgCarrier"></g>
								<g
									stroke-linejoin="round"
									stroke-linecap="round"
									id="SVGRepo_tracerCarrier"
								></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path>{" "}
								</g>
							</svg>
							Apple Store
						</button>
						<button className="button btn2">
							<svg
								stroke="#ffffff"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#ffffff"
							>
								<g stroke-width="0" id="SVGRepo_bgCarrier"></g>
								<g
									stroke-linejoin="round"
									stroke-linecap="round"
									id="SVGRepo_tracerCarrier"
								></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"></path>
								</g>
							</svg>
							Play Store
						</button>
					</div>
				</div>
				<div data-aos="fade-left" className="app--img--section">
					<img
						className="app--img"
						src={appImg}
						width={100}
						height={200}
						alt="appImg"
					/>
				</div>
			</section>
			<section className="home--team">
				<h3 className="team--headng">Our Team</h3>
				<div className="team--card--container">
					<Team />
					<Team />
					<Team />
					<Team />
					<Team />
				</div>
			</section>
			<section className="home--conatct">
				<div class="contact-form-container">
					<div class="contact-form-left">
						<h2>Contact Us</h2>
						<form id="contact-form">
							<label for="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Your Email"
								required
							/>

							<label for="password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Your Password"
								required
							/>

							<label for="query">Your Query</label>
							<textarea
								id="query"
								name="query"
								placeholder="Type your query here..."
								required
							></textarea>

							<button type="submit">Submit</button>
						</form>
					</div>
					<div class="contact-form-right">
						<iframe
							title="map"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224366.24352750867!2d-74.01145318669928!3d40.713479546686745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046e04c99%3A0x3848b67abfb66780!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1560440186311!5m2!1sen!2sus"
							width="600"
							height="450"
							frameborder="0"
							style={{ border: 0 }}
							allowfullscreen
						></iframe>
					</div>
				</div>
			</section>
			<footer>
				<div class="footer-content">
					<p>&copy; 2023 OpenNexus Project</p>
				</div>
			</footer>
		</>
	);
}
