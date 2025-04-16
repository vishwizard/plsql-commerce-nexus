import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const usernames = {
  instagram: "https://www.instagram.com/vishwizard",
  twitter: "https://twitter.com/vishwizard",
  github: "https://github.com/vishwizard",
  linkedin: "https://linkedin.com/in/vishwizard",
  facebook: "https://facebook.com/vishwizard",
};

const SocialRedirect = () => {
  const { platform } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = usernames[platform];
    if (url) {
      window.location.href = url;
    } else {
      navigate("/"); // or 404
    }
  }, [platform, navigate]);

  return null;
};

export default SocialRedirect;
