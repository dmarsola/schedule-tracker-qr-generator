export default function Topbar() {
  // TODO: pass a parameter indicating in which page we are

  const navItems = [{ label: 'Schedule Tracker App', href: '/tracker_app' }]

  return (
    <nav className="navbar navbar-expand-lg print-hide">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Schedule QR generator
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {/* TODO if current page add class active and aria-current="page" */}
            {navItems.map((item) => (
              <a key={item.label} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
