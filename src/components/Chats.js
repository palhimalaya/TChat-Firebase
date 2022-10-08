import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user || user === null) {
      history.push("/");
      return;
    }
    // Get-or-Create should be in a Firebase Function
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "203c4ca8-286b-4280-8e89-9f01fc09f4ff",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "92f687ea-4693-47ce-ba42-fee93bd195ba",
              },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log(e.response));
        });
      });
  }, [user, history]);

  if (!user || loading) return <div />;
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Tchat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh -66px)"
        projectID="203c4ca8-286b-4280-8e89-9f01fc09f4ff"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
