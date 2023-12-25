import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`;
        const { data } = await axios.get(url);

        setAlert({
          msg: data.msg,
          error: false,
        });
        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirm your account and start creating your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;