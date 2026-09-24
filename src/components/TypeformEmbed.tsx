// Inline Typeform embed for event registration. Registration (and any payment)
// now happens inside Typeform, so the page just hosts the form — plus a plain
// link out in case the iframe is blocked (privacy extensions, in-app browsers).

export default function TypeformEmbed({ formId, title }: { formId: string; title: string }) {
  const url = `https://form.typeform.com/to/${formId}`;
  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-mist bg-white">
        <iframe
          src={`${url}?typeform-embed=embed-widget`}
          title={title}
          className="block h-[640px] w-full"
          allow="camera; microphone; autoplay; encrypted-media; payment"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-center text-sm text-teal-soft">
        Form not loading?{' '}
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline">
          Open it in a new tab
        </a>
      </p>
    </div>
  );
}
