import PredictionForm from "../components/PredictionForm";


export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">
          AI PROPERTY VALUATION
        </p>

        <h1>
          House Price
          <br />
          Prediction
        </h1>

        <p className="hero-description">
          Enter the property details below and our
          machine learning model will estimate its
          market price.
        </p>
      </section>


      <section className="card">
        <div className="section-heading">
          <h2>
            Property Details
          </h2>

          <p>
            Fill in the information to get your
            estimated price.
          </p>
        </div>

        <PredictionForm />
      </section>
    </main>
  );
}