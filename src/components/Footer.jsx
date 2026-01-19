function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
        <div>
            © {year} <strong>Createrra</strong>. Monitoring & Control System
        </div>
    </footer>
  )
}

export default Footer;