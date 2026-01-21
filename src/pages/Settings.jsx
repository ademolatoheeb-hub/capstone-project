import { useEffect, useState } from "react";
import "../styles/Settings.css";
import toast from "react-hot-toast";


export default function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  /* Load saved data */
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    const savedTheme = localStorage.getItem("theme");

    if (savedProfile) setProfile(savedProfile);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  /* Save theme */
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleProfileSave = () => {
  localStorage.setItem("profile", JSON.stringify(profile));
  toast.success("Profile updated successfully");
};

const handlePasswordChange = () => {
  if (!passwords.current || !passwords.new) {
    toast.error("Please fill all password fields");
    return;
  }

  toast.success("Password updated");
  setPasswords({ current: "", new: "" });
};

const handleDeleteAccount = () => {
  localStorage.clear();
  toast.success("Account deleted");
  window.location.href = "/signin";
};


 return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

      {/* PROFILE */}
      <section className="settings-card">
        <h2>Profile</h2>

        <div className="field">
          <label>Full Name</label>
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            placeholder=""
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            placeholder=""
          />
        </div>

        <button className="primary-btn" onClick={handleProfileSave}>
          Save Changes
        </button>
      </section>

      {/* CHANGE PASSWORD */}
      <section className="settings-card">
        <h2>Change Password</h2>

        <div className="field">
          <label>Current Password</label>
          <input
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>New Password</label>
          <input
            type="password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
          />
        </div>

        <button className="primary-btn" onClick={handlePasswordChange}>
          Update Password
        </button>
      </section>

      {/* THEME */}
      <section className="settings-card">
        <h2>Theme</h2>

        <div className="theme-toggle">
          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme("light")}
          >
            ☀ Light
          </button>
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme("dark")}
          >
            🌙 Dark
          </button>
        </div>
      </section>

      {/* DELETE ACCOUNT */}
      <section className="settings-card danger">
        <h2>Danger Zone</h2>
        <button className="danger-btn" onClick={() => setShowModal(true)}>
          Delete Account
        </button>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete Account?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="danger-btn" onClick={handleDeleteAccount}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
