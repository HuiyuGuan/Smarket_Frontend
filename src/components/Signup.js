import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup(props) {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [user, setUser] = useState([]);

  function validate() {
    let isValidate = true;

    if (firstname === "" || lastname === "") {
      setNameError("Name CAN NOT be blank");
      isValidate = false;
    } else setNameError("");

    if (username === "") {
      setUsernameError("Username CAN NOT be blank");
      isValidate = false;
    } else if (username === user.username) {
      setUsernameError("Username is already taken");
      isValidate = false;
    } else setUsername("");

    if (password === "") {
      setPasswordError("Password CAN NOT be blank");
      isValidate = false;
    } else setPasswordError("");

    if (confirmPassword !== password) {
      setConfirmPasswordError("Password and confirm password DOES NOT match");
      isValidate = false;
    } else setConfirmPasswordError("");

    if (!email.includes("@")) {
      setEmailError("Invalid email");
      isValidate = false;
    } else setEmailError("");

    if (country === "") {
      setCountryError("Country CAN NOT be blank");
      isValidate = false;
    } else setCountryError("");

    if (phone.charAt(3) !== "-" || phone.charAt(7) !== "-") {
      setPhoneError("Invalid Phone number");
      isValidate = false;
    } else setPhoneError("");

    return isValidate;
  }

  async function addUser() {
    await axios.post("http://localhost:8080/users", {
      username: username,
      password: password,
      name: `${firstname} ${lastname}`,
      email: email,
      country: country,
      phone: phone,
    });
  }
  async function fetchUser(username) {
    const users = await axios.get("http://localhost:8080/users/" + username);
    if (users) {
      setUser(users.data);
    }
  }

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  async function handlesubmit(event) {
    event.preventDefault();
    if (validate()) {
      await addUser();
      navigate("/");
    }
  }

  return (
    <form className="signup-form" onSubmit={handlesubmit}>
      <h1>Sign-up</h1>
      <label>
        Firstname: <br></br>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Lastname: <br></br>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
        />
      </label>
      <br></br>
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
        Email: <br></br>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Country: <br></br>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Phone: <br></br>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
      <label>
        Re-enter Password: <br></br>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <button class="button-70" role="button" type="submit" value="submit">
        submit
      </button>
      <div className="form-error">
        <p>{nameError}</p>
        <p>{usernameError}</p>
        <p>{emailError}</p>
        <p>{countryError}</p>
        <p>{phoneError}</p>
        <p>{passwordError}</p>
        <p>{confirmPasswordError}</p>
      </div>
    </form>
  );
}
