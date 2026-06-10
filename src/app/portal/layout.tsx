// Portal shell — deliberately plainer than the public site. This is a tool, not a brochure.
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-mist/50">{children}</div>;
}
