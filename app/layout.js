export const metadata = {
  title: "AI Website Builder",
  description: "Generate websites with AI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
