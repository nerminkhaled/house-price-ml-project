import { useNavigate } from "react-router-dom";


export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="page">
      <section className="card not-found">

        <p className="eyebrow">
          404
        </p>

        <h1>
          Page not found
        </h1>

        <p>
          The page you are looking for does not exist.
        </p>

        <button
          className="predict-button"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>

      </section>
    </main>
  );
}