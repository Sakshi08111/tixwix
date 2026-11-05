
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  ArrowRight,
  MailCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./EmailVerified.css";

export default function EmailVerified() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    async function checkConfirmation() {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        const hashParams = new URLSearchParams(
          window.location.hash.replace(/^#/, "")
        );

        const error =
          params.get("error_description") ||
          params.get("error") ||
          hashParams.get("error_description") ||
          hashParams.get("error");

        if (error) {
          if (active) setStatus("error");
          return;
        }

        // Supabase redirects may contain a token exchange
        // that the client processes asynchronously.
        const { data, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!active) return;

        if (data.session?.user?.email_confirmed_at) {
          setStatus("success");
        } else {
          setStatus("unverified");
        }
      } catch (err) {
        console.error("Verification check failed:", err);
        if (active) setStatus("error");
      }
    }

    checkConfirmation();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="verified-page">
      <div className="verified-card">
        {status === "checking" ? (
          <>
            <LoaderCircle
              size={48}
              className="verified-spinner"
            />
            <h1>Checking your verification...</h1>
            <p>Please wait while we check your account.</p>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2
              size={62}
              className="verified-success-icon"
            />
            <span className="verified-kicker">
              TIXWIX ORGANIZER PORTAL
            </span>
            <h1>Email verified successfully!</h1>
            <p>
              Your email address has been confirmed.
              You can now log in to your organizer account.
            </p>
            <Link to="/login" className="verified-button">
              Continue to Login <ArrowRight size={18} />
            </Link>
          </>
        ) : status === "unverified" ? (
          <>
            <MailCheck size={58} className="verified-info-icon" />
            <h1>Verification not confirmed</h1>
            <p>
              We couldn't confirm verification from this
              page. Please check the link in your email
              or log in to check your account status.
            </p>
            <Link to="/login" className="verified-button">
              Go to Login <ArrowRight size={18} />
            </Link>
          </>
        ) : (
          <>
            <CircleAlert
              size={58}
              className="verified-error-icon"
            />
            <h1>Verification link unavailable</h1>
            <p>
              This verification link may have expired
              or could not be processed.
              Please try again from your email.
            </p>
            <Link to="/login" className="verified-button">
              Back to Login <ArrowRight size={18} />
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
