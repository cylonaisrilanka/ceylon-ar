export default function Footer() {
  return (
    <footer className="py-8 bg-card text-card-foreground">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ceylonar Digital Portfolio. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-muted-foreground">
          Crafting Digital Excellence
        </p>
      </div>
    </footer>
  );
}
