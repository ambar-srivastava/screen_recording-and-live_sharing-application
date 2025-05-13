"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const page = () => {
  const handleGoogleSignIn = async () => {
    return await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          <h1>RecordCast</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="review-star"
                  width={20}
                  height={20}
                  key={index}
                />
              ))}
            </figure>
            <p>
              RecordCast makes screen recording easy. From quick walkthroughs to
              full presentations, it&#39;s fast, simple, smooth, and sharable in
              seconds. And it&#39;s free!
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Jason Reeves</h2>
                <p>Product Developer, Google</p>
              </div>
            </article>
          </section>
        </div>
        <p>&copy; RecordCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={40}
              height={40}
            />
            <h1>RecordCast</h1>
          </Link>
          <p>
            Create and share your very first <span>RecordCast video</span> in no
            time!
          </p>
          <button onClick={handleGoogleSignIn}>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={22}
              height={22}
            />
            <span>Sign in with Google </span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default page;
