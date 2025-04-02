export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Murugesh S. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

