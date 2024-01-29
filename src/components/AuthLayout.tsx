export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-24 flex justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
