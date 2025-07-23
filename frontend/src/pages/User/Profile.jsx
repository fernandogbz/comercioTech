import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [run, setRun] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setRun(userInfo.run);
    setName(userInfo.name);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setAddress(userInfo.address);
  }, [
    userInfo.run,
    userInfo.name,
    userInfo.lastName,
    userInfo.email,
    userInfo.phone,
    userInfo.address,
  ]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          run,
          name,
          lastName,
          email,
          phone,
          address,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Perfil actualizado exitosamente");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Perfil</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Run</label>
              <input
                type="text"
                className="form-input p-4 rounded-sm w-full"
                value={run}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa nombre"
                className="form-input p-4 rounded-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Apellido</label>
              <input
                type="text"
                placeholder="Ingresa apellido"
                className="form-input p-4 rounded-sm w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Ingresa email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Teléfono</label>
              <input
                type="text"
                placeholder="Ingresa teléfono"
                className="form-input p-4 rounded-sm w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Dirección</label>
              <input
                type="text"
                placeholder="Ingresa dirección de envios"
                className="form-input p-4 rounded-sm w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresar contraseña"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                placeholder="Repite la contraseña ingresada"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Actualizar
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Mis Pedidos
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
