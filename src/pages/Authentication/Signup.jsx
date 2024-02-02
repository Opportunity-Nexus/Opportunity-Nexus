import Template from "../../Components/Authentication/Template";
import signupImg from "../../assets/utils/signup.svg";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Create your  Account "
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
