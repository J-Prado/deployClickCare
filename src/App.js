import { Redirect, Route } from "react-router-dom";
import Landingpage from "./components/Landingpage/Landingpage.js";
import Login from "./components/LoginForm/Login.js";
import Navbar from "./components/Navbar/Navbar.js";
import Signin from "./components/Signin/Signin.js";
import About from "./components/About/About.js";
import Offers from "./components/Offers/Offers.js";
import DowloadApp from "./components/DowloadApp/DowloadApp.js";
import ContactUs from "./components/ContactUs/ContactUs.js";
import Welcome from "./components/Welcome/Welcome.js";
import Professional from "./components/Professional/Professional.js";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus.js";
import Chat from "./components/Chat/Chat.js";
import Profile from "./components/ProfileID/Profile.js";
import PostForm from "./components/PostForm/PostForm.js";

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
      <Route exact path="/professional" component={Professional} />
      <Route exact path="/paymentStatus" component={PaymentStatus} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/user/:id" component={Profile} />
      <Route exact path="/postForm">
        {localStorage.getItem("session") ? (
          <PostForm />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      {/* <Route path="*">
        <Redirect to="/" replace />
      </Route> */}
    </div>
  );
}

export default App;
