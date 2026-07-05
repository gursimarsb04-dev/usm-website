import Link from 'next/link';

export default function ConfirmEmail() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-teal/10 p-8 shadow-sm text-center">
        <div className="text-4xl mb-4">📬</div>
        <h1 className="font-display text-2xl font-bold text-teal">Check your email</h1>
        <p className="text-sm text-teal-soft mt-3 leading-relaxed">
          We sent a confirmation link to your inbox. Click it to activate your account and sign in.
        </p>
        <p className="mt-4 text-xs text-teal-soft/70">
          Didn't get it? Check your spam folder.
        </p>
        <Link href="/auth/login"
          className="inline-block mt-6 rounded-full bg-teal text-white px-8 py-3 font-display font-semibold hover:bg-teal-ink transition-colors text-sm">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
