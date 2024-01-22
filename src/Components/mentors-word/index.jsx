
import Mentor from "../../assets/team/sadik-khan-sir.jpg";

export default function MentorsWords() {
  return (
    <section className="lg:mb-24 pt-16 lg:py-24">
      <div className="bg-primary-500  pb-16 lg:relative lg:z-10 lg:pb-0">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <div className="relative lg:-my-8">
            <div className="top-1/3 mx-auto max-w-md px-4 pt-6 sm:max-w-3xl sm:px-6 lg:h-full lg:p-0">
              <div className="aspect-w-10 aspect-h-2 sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none overflow-hidden rounded-xl shadow-xl lg:h-full">
                <img
                  className="object-cover lg:h-full lg:w-full"
                  src={Mentor}
                  alt="Project Mentor" 
                />
              </div>
            </div>
          </div>
          <div className="mt-12 lg:col-span-2 lg:m-0 lg:pl-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
              <blockquote>
                <div>
                  <svg
                    className="h-12 w-12 text-white opacity-25"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="mt-6 text-2xl font-medium text-white">
                  Welcome to <b className="text-black">Opportunity Nexus</b>, where your potential meets possibility. As a mentor in this vibrant community, I've witnessed firsthand the transformative power of connecting passionate individuals with the right opportunities. Our mission goes beyond just listing opportunities; we strive to empower, guide, and support you at every step of your journey.
                  </p>
                </div>
                <footer className="mt-6">
                  <p className="text-base font-medium text-black">
                    Dr. Sadik Khan
                  </p>
                  <p className="text-base font-medium text-indigo-100">
                    Head of the Department (Computer Science and Engineering)<br />
                    Project Mentor
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
