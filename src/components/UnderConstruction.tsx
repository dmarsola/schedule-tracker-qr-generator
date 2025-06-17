import { Button } from 'primereact/button'
import React from 'react'

export default function UnderConstruction() {
  const handleClick = () => {
    alert('Whip cracked! Our AI minions are working faster now.')
  }

  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-75">
      <h1 className="display-4 mb-3">🔧 Under Construction</h1>
      <h3>We’re Cooking Up Something Beautiful!</h3>
      <p className="lead mb-4">
        Our digital slaves are busy generating <em>mind-blowing</em> content.
        <br />
        Please wait while the bots finish their last existential crisis.
      </p>

      <img
        src="https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
        alt="AI Robot Working"
        className="img-fluid mb-4"
        style={{ maxWidth: '300px' }}
      />

      <Button label="Motivate the Bots" icon="pi pi-cog" className="p-button-warning" onClick={handleClick} />

      <p className="mt-5 text-muted small">💡 Tip: Refreshing this page won't help, but it might make you feel in control.</p>
    </div>
  )
}
