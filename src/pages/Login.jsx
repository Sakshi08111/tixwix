
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Ticket,
  ShieldCheck,
  Sparkles,
  CalendarDays,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Login.css";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.81 7.18l7.73 6C44.37 38.03 46.98 31.88 46.98 24.55z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.77-4.59l-7.98-6.2A23.8 23.8 0 0 0 0 24c0 3.87.93 7.51 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.89-5.8l-7.73-6C30.01 37.64 27.24 38.5 24 38.5c-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setNotice("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setNotice("");

    const email = form.email.trim().toLowerCase();

    if (isSignup) {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!form.organizationName.trim()) {
        setError("Please enter your organization name.");
        return;
      }

      if (!/^[0-9]{10}$/.test(form.phone.trim())) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }

      if (form.password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { error: signupError } =
          await supabase.auth.signUp({
            email,
            password: form.password,
            options: {

emailRedirectTo: `${window.location.origin}/auth/confirmed`,
              data: {
                full_name: form.fullName.trim(),
                organization_name:
                  form.organizationName.trim(),
                phone: form.phone.trim(),
              },
            },
          });

        if (signupError) throw signupError;

        setNotice(
          "Registration request received. Check your email for a verification link. If an account already exists, use Log in."
        );

        setForm((previous) => ({
          ...previous,
          password: "",
          confirmPassword: "",
        }));
      } else {
        const { error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          });

        if (loginError) throw loginError;

        navigate("/organizer/dashboard");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/organizer/dashboard`,
          },
        });

      if (googleError) throw googleError;
    } catch (err) {
      setError(
        err.message ||
        "Google login failed. Please try again."
      );
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setNotice("");

    const email = form.email.trim().toLowerCase();

    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) throw resetError;

      setNotice(
        "If this email is registered, a password reset link has been sent."
      );
    } catch (err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-background" aria-hidden="true" />

      <div className="auth-shell page-wrap">
        {/* LEFT PANEL */}
        <div className="auth-art">
          <div className="auth-art-overlay" />

          <Link to="/" className="auth-back">
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="auth-art-copy">
            <span className="auth-art-eyebrow">
              <Sparkles size={15} />
              YOUR NEXT STORY STARTS HERE
            </span>

            <h1>
              Good events.
              <br />
              Great people.
              <br />
              <span>Real memories.</span>
            </h1>

            <p>
              Create unforgettable experiences,
              bring people together and
              make every event worth remembering.
            </p>

            <div className="auth-art-features">
              <span>
                <CalendarDays size={15} />
                Create events
              </span>
              <span>
                <Ticket size={15} />
                Manage tickets
              </span>
            </div>
          </div>

          <div className="auth-art-bottom">
            <div className="auth-art-brand">
              <span className="auth-art-brand-icon">
                <Ticket size={19} />
              </span>
              <span>Tixwix</span>
            </div>

            <span>YOUR CITY. YOUR SCENE.</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-card">
          <div className="auth-mobile-logo">
            <Ticket size={22} />
            <strong>
              EVENT <span>ROCKERZ.</span>
            </strong>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              aria-pressed={mode === "login"}
              onClick={() => changeMode("login")}
            >
              Log in
            </button>

            <button
              type="button"
              className={isSignup ? "active" : ""}
              aria-pressed={isSignup}
              onClick={() => changeMode("signup")}
            >
              Sign up
            </button>
          </div>

          <div className="auth-heading">
            <span className="auth-kicker">
              {isSignup
                ? "BECOME AN Tixwix ORGANIZER"
                : "ORGANIZER PORTAL"}
            </span>

            <h2>
              {isSignup
                ? "Bring your events to life."
                : "Welcome back."}
            </h2>

            <p>
              {isSignup
                ? "Create your organizer account and start hosting unforgettable experiences."
                : "Log in to manage your events, bookings and tickets."}
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="auth-google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {/* ORGANIZER FORM */}
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {isSignup && (
              <>
                <div className="auth-form-group">
                  <label htmlFor="auth-name">
                    Full name
                  </label>
                  <input
                    id="auth-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={updateField}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="auth-organization">
                    Organization / Event company name
                  </label>
                  <input
                    id="auth-organization"
                    name="organizationName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Enter your organization name"
                    value={form.organizationName}
                    onChange={updateField}
                    required
                  />
                </div>
              </>
            )}

            <div className="auth-form-group">
              <label htmlFor="auth-email">
                Email address
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={updateField}
                required
              />
            </div>

            {isSignup && (
              <div className="auth-form-group">
                <label htmlFor="auth-phone">
                  Phone number
                </label>
                <input
                  id="auth-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  placeholder="Enter 10-digit mobile number"
                  value={form.phone}
                  onChange={updateField}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            )}

            <div className="auth-form-group">
              <div className="auth-label-row">
                <label htmlFor="auth-password">
                  Password
                </label>

                {!isSignup && (
                  <button
                    type="button"
                    className="auth-forgot"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div className="auth-password-wrapper">
                <input
                  id="auth-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete={
                    isSignup
                      ? "new-password"
                      : "current-password"
                  }
                  placeholder={
                    isSignup
                      ? "Create a password (8+ characters)"
                      : "Enter your password"
                  }
                  minLength={isSignup ? 8 : undefined}
                  value={form.password}
                  onChange={updateField}
                  required
                />

                <button
                  type="button"
                  className="auth-eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            {isSignup && (
              <div className="auth-form-group">
                <label htmlFor="auth-confirm-password">
                  Confirm password
                </label>

                <div className="auth-password-wrapper">
                  <input
                    id="auth-confirm-password"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    minLength={8}
                    value={form.confirmPassword}
                    onChange={updateField}
                    required
                  />

                  <button
                    type="button"
                    className="auth-eye-button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {form.confirmPassword &&
                  form.password !==
                    form.confirmPassword && (
                    <p
                      style={{
                        color: "#ff758f",
                        fontSize: "12px",
                        marginTop: "6px",
                      }}
                    >
                      Passwords do not match
                    </p>
                  )}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create organizer account"
                : "Log in"}
              <ArrowUpRight size={18} />
            </button>
          </form>

          {error && (
            <p
              className="auth-notice"
              role="alert"
              style={{ color: "#ff758f" }}
            >
              {error}
            </p>
          )}

          {notice && (
            <p
              className="auth-notice"
              role="status"
              style={{ color: "#76e3bb" }}
            >
              {notice}
            </p>
          )}

          <p className="auth-switch-text">
            {isSignup
              ? "Already have an organizer account?"
              : "New organizer?"}

            <button
              type="button"
              onClick={() =>
                changeMode(
                  isSignup ? "login" : "signup"
                )
              }
            >
              {isSignup
                ? "Log in"
                : "Create an account"}
            </button>
          </p>

          <div className="auth-bottom-note">
            <ShieldCheck size={15} />
            <p>
              Organizer accounts only. Customers
              can book events without logging in.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-page-footer">
        <span>© Tixwix</span>
        <span>Good times start here.</span>
      </div>
    </main>
  );
}
