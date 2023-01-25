import Sucursales from "./Sucursales"

const Header = () => {
  return (
    <header className='header'>
        <div className='container'>
            <a href='/' className='header__logo'>
                <h1>Olimpio</h1>
            </a>
            <Sucursales />
            <nav className='header__menu'>
                <div className='dropdown-menus'>
                    <a href="/" className="dropdown-link">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <title>sign-out</title>
                            <path
                                d="M3 0h22c0.553 0 1 0 1 0.553l-0 3.447h-2v-2h-20v28h20v-2h2l0 3.447c0 0.553-0.447 0.553-1 0.553h-22c-0.553 0-1-0.447-1-1v-30c0-0.553 0.447-1 1-1z"
                            ></path>
                            <path
                                d="M21.879 21.293l1.414 1.414 6.707-6.707-6.707-6.707-1.414 1.414 4.293 4.293h-14.172v2h14.172l-4.293 4.293z"
                            ></path>
                        </svg>
                        Logout
                    </a>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Header
