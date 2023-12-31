import React from 'react'
import './styles.scss'
import Button from '../../Buttons/Button'
import { useMediaQuery } from 'react-responsive'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/login'
import { toast } from 'react-toastify'
import useCheckToken from '../../../hooks/useCheckToken'

interface INavContainer {
  children: React.ReactNode
  className?: string
}

const NavContainer: React.FC<INavContainer> = ({ children, className }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const navigate = useNavigate()
  const onTokenExpiration = () => {
    toast.error("reconnectez vous")
    navigate('/')
  };
  useCheckToken(onTokenExpiration)
  const onLogout = () => {
    try {
      logout()
      toast.success('Success')
      Navigate({ to: '/' })
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <div className="navScreen h-full">
      <div className="navScreen-header flex-1 flex-row justify-between ">
        <div className="navScreen-logoContainer ml-3 mt-1">
          <img src="./logoGris.png" className=' h-20' />
        </div>
        <div className='navScreen-checkin flex flex-row justify-end mr-5 overflow-auto'>
          <Link to={'/profile'}>
            <Button className=' p-5 text-white hover:border-b-2 hover:border-gray-300' type='button'>Profil</Button>
          </Link>
          <Link to={'/findhome'}>
            <Button className=' w-full p-5 text-white hover:border-b-2 hover:border-gray-300' type='button'>Trouver un logement</Button>
          </Link>
          <Link to={'/adLogement'}>
            <Button className=' w-full p-5 text-white hover:border-b-2 hover:border-gray-300' type='button'>Ajouter un logement</Button>
          </Link>
          <Link to={'/activity'}>
            <Button className=' p-5 text-white hover:border-b-2 hover:border-gray-300' type='button'>Activités</Button>
          </Link>
          <Link to={'/demarches'}>
            <Button className=' p-5 text-white hover:border-b-2 hover:border-gray-300' type='button'>Mes demarches</Button>
          </Link>
          <Link to={'/'}>
            <Button onClick={onLogout} className='h-12 w-full hover:bg-orange-400 bg-orange-500 text-white rounded-3xl  px-4 py-2 mt-3' type='button'>Deconnexion</Button>
          </Link>
        </div>
      </div>
      <div className={`navScreen-body ${className}`}>
        {children}
      </div>
      <div className="navScreen-footer">
        <p className="size-small weight-light fc-brownish-grey-primary mr-30 mr-15Mobile">Groupe 5</p>
      </div>
    </div>
  )
}

export default NavContainer
