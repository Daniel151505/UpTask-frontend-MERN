import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All the fields are required",
        error: true,
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: "Passwords are no equals",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "The password is very small, add a minimum of 6 characters",
        error: true,
      });
      return;
    }

    setAlert({});

    // Create user in the API
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Create your account and manage your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repeat Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Create Account"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Do you already have an account? Login
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Register;
