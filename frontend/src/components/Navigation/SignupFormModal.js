import SignupFormPage from "../SignupFormPage"

function SignupFormModal({ setModal }) {
  const onClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      setModal(false);
    }
  };

  return (
    <div onClick={onClick}>
      <div>
        <SignupFormPage />
      </div>
    </div>
  );
}

export default SignupFormModal
