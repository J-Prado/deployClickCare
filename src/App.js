import { Redirect, Route, Switch } from "react-router-dom";
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
import ProfileID from "./components/ProfileID/ProfileID.js";
import PostForm from "./components/PostForm/PostForm.js";
import DataEdition from "./components/DataEdition/DataEdition.js";
import OfferCardDetailed from "./components/Offers/OfferCardDetailed/OfferCardDetailed.js"; //DETALLE
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js";
import Contract from "./components/Contratos/Contract.js";
import Forbiden from "./components/Forbiden/Forbiden.js";
import Mercadopago from "./components/ProfileID/UserById/mercadopago/mercadopago.js";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
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
        <Route exact path="/user/:id" component={ProfileID} />
        <Route exact path="/postForm">
          {localStorage.getItem("session") ? (
            <PostForm />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/dataedition" component={DataEdition} />
        <Route exact path="/forgetpassword" component={ForgotPassword} />
        <Route
          exact
          path="/OfferCardDetailed/:id"
          component={OfferCardDetailed}
        />
        {/* <Route exact path="/OfferCardDetailed/:id">
          {localStorage.getItem("session") ? (
            <OfferCardDetailed />
          ) : (
            <Redirect to="/login" />
          )}
        </Route> */}

        {/* <Route exact path="/user/:id">
          {localStorage.getItem("session") ? (
            <ProfileID />
          ) : (
            <Redirect to="/login" />
          )}
        </Route> */}
        <Route exact path="/mercadopago" component={Mercadopago} />
        <Route exact path="/contract" component={Contract} />
        <Route exact path="*" component={Forbiden} />
      </Switch>

      {/* <Route path="/*">
        <Redirect to="/" replace />
      </Route> */}
    </div>
  );
}

export default App;
