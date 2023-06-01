import LoginFormPage from "../LoginFormPage";

function LoginFormModal({ setModal }) {
  const onClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      setModal(false);
    }
  };

  return (
    <div onClick={onClick}>
      <div>
        <LoginFormPage />
      </div>
    </div>
  );
}

export default LoginFormModal
