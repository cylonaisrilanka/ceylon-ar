export default function Footer() {
  return (
    <footer className="py-10 bg-card text-card-foreground border-t border-border/20">
      <div className="container mx-auto text-center">
        <p className="text-md">
          &copy; {new Date().getFullYear()} CEYLONAR. All dimensions reserved.
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          Architecting Tomorrow's Digital Universe, Today.
        </p>
      </div>
    </footer>
  );
}
