import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login(props) {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState([]);

  async function fetchUser(username) {
    const users = await axios.get("https://smarket-backend.vercel.app/users/" + username);
    if (users) {
      setUser(users.data);
    }
  }

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  function validate() {
    let isValidate = true;
    if (username !== user.username) {
      setUsernameError("Incorrect username");
      isValidate = false;
    } else setUsernameError("");

    if (password !== user.password) {
      setPasswordError("Incorrect password");
      isValidate = false;
    } else setPasswordError("");

    return isValidate;
  }

  async function handlesubmit(event) {
    event.preventDefault();
    console.log(user);
    if (validate()) {
      props.setlogin(user);
      navigate("/");
    }
  }

  return (
    <div>
      <form className="login" onSubmit={handlesubmit}>
        <h1>Sign-in</h1>
        <label>
          Username: <br></br>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password: <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
        <button class="button-70" role="button" type="submit" value="submit">
          submit
        </button>
        <button
          onClick={() => navigate("/signup")}
          class="button-70"
          role="button"
        >
          sign up
        </button>
        <div className="validation">
          <p>{usernameError}</p>
          <p>{passwordError}</p>
        </div>
      </form>
    </div>
  );
}
