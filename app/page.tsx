import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <div className={css.intro}>
          <h1>Welcome to NoteHub!</h1>
          <p>
            Your safe place for notes. Please use the navigation menu or the
            buttons below to get started.
          </p>
        </div>
        <div className={css.ctas}>
          <Link href="/sign-in" className={css.primary}>
            Login
          </Link>
          <Link href="/sign-up" className={`${css.primary} ${css.secondary}`}>
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}
