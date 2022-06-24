//<<<<<<< Juan-Form-LogIn
import { Route } from "react-router-dom";
import Landingpage from "./components/Landingpage/Landingpage.js";
import Login from "./components/LoginForm/Login.js";
import Navbar from "./components/Navbar/Navbar.js";
import Signin from "./components/Signin/Signin.js";
import About from "./components/About/About.js";
import Offers from "./components/Offers/Offers.js";
import DowloadApp from "./components/DowloadApp/DowloadApp.js";
import ContactUs from "./components/ContactUs/ContactUs.js";
import Welcome from "./components/Welcome/Welcome.js";
import CreatePost from "./components/CreatePost/CreatePost.js";
import Professional from "./components/Professional/Professional.js";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus.js";
function App() {
  return (
    <div>
      <Navbar />
      <Route exact path="/" component={Landingpage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/about" component={About} />
      <Route exact path="/offers" component={Offers} />
      <Route exact path="/dowloadApp" component={DowloadApp} />
      <Route exact path="/contactUs" component={ContactUs} />
      <Route exact path="/welcome/:id" component={Welcome} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/postCreation" component={CreatePost} />
      <Route exact path="/professional" component={Professional} />
      <Route exact path="/paymentStatus" component={PaymentStatus} />
    </div>
  );
}

export default App;
