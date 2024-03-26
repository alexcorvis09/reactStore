import clsx from "clsx";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   fetch("https://dummyjson.com/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       // username: userName,
  //       // password: password,
  //       // expiresInMins: 60, // optional
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       if (json.token) {
  //         localStorage.setItem("token:", json.token);
  //         // setUsername("");
  //         // setPassword("");
  //         navigate("/");
  //         return;
  //       }
  //       // setError("No pasa compa");
  //     })
  //     .catch((error) => {
  //       console.log("Login error:", error);
  //     });
  // }

  async function onSubmit(data) {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
      navigate("/");
      return;
    }
    setError("root", { message: "No pasa compa" });
    console.log(json);
  }

  return (
    <div className="bg-gray-200 min-h-screen p-10 flex justify-center">
      <div className="bg-pink-200 size-60 rounded p-3">
        <p className="flex justify-center">Welcome!</p>
        <form
          className=" grid grid-rows-2 gap-3 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={clsx("p1 rounded text-black", {
              "border-2 border-pink-600": errors.username,
            })}
            type="text"
            name="username"
            required
            placeholder="Username"
            {...register("username", {
              minLength: { value: 3, message: "Son 3 caracteres mínimo" },
              maxLength: { value: 100, message: "Son 100 caracteres máximo" },
            })}
          />
          {errors.username && (
            <p className=" text-xs text-red-700">{errors.username.message}</p>
          )}
          <input
            className="rounded"
            type="password"
            name="password"
            required
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-pink-500 rounded flex justify-center  bottom-0"
          >
            Sign In
          </button>
          {
            errors.root && <p className="text-red-700">{errors.root.message}</p>
            // <p className={clsx({ hidden: !error }, "text-pink-800")}>{error}</p>
          }
        </form>
      </div>
    </div>
  );
}
