import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.token) {
          localStorage.setItem("token:", json.token);
          setUsername("");
          setPassword("");
          navigate("/");
          return;
        }
        setError("No pasa compa");
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
  }

  return (
    <div className="bg-gray-200 min-h-screen p-10 flex justify-center">
      <div className="bg-pink-200 size-96 rounded p-16">
        <p className="flex justify-center">Welcome!</p>
        <form className=" grid grid-rows-2 gap-3 p-5" onSubmit={handleSubmit}>
          <input
            className="rounded"
            type="text"
            name="username"
            required
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            value={userName}
          />
          <input
            className="rounded"
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button
            type="submit"
            className="bg-pink-500 rounded flex justify-center  bottom-0"
          >
            Sign In
          </button>
          {
            // error && <p className="text-red-700">{error}</p>
            <p className={clsx({ hidden: !error }, "text-pink-800")}>{error}</p>
          }
        </form>
      </div>
    </div>
  );
}
