import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-6 lg:px-10 pt-32 pb-24 text-center">
      <p className="t-label">404</p>
      <h1 className="t-h2 mt-4">Diese Seite gibt es nicht mehr.</h1>
      <p className="t-body-lg mt-5">
        Die Inhalte sind auf die Startseite umgezogen.
      </p>
      <div className="mt-8 flex justify-center">
        <Link href="/" className="btn-primary">
          Zur Startseite
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
