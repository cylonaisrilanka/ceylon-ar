export default function Footer() {
  return (
    <footer className="py-10 bg-card/70 text-card-foreground border-t border-border/20">
      <div className="container mx-auto text-center">
        <p className="text-md text-shadow">
          &copy; {new Date().getFullYear()} CEYLONAR. All dimensions reserved.
        </p>
        <p className="text-sm mt-2 text-muted-foreground text-shadow">
          Architecting Tomorrow's Digital Universe, Today.
        </p>
      </div>
    </footer>
  );
}
