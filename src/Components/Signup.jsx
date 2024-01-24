import Template from "./Template";
import signupImg from "../assets/utils/signup.svg";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Create your  Account "
      // description1="where opportunities meet ambition!"
      // description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
