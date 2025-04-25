import { GoogleLogin } from "@react-oauth/google";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await API.post("/google-login/", {
        access_token: credentialResponse.credential, // Sending ID token as auth_token
      });
      console.log(res.data)
      Cookies.set("token", res.data.access, { expires: 7 });

      console.log("Google Login Success!");

      navigate("/profile");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}