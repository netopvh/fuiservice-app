'use client'

import React, { useEffect, useState } from 'react'
import './layout.css'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { useTranslation } from 'react-i18next'
import { toggleAnimation, toggleLayout, toggleLocale, toggleMenu, toggleNavbar, toggleRtl, toggleSemidark, toggleSidebar, toggleTheme } from '@/redux/store/slices/themeConfig'
import themeConfig from '@/theme.config'
import { usePathname, useSearchParams } from 'next/navigation'
import Sidebar from './sidebar'
import Head from './head'
import Footer from './footer'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const themeConfigSelector = useAppSelector((state: RootState) => state.themeConfig)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // const { i18n } = useTranslation()

  const [showLoader, setShowLoader] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [animation, setAnimation] = useState(themeConfig.animation);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const onScrollHandler = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  }

  useEffect(() => {

    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme))
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu))
    dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout))
    dispatch(toggleRtl(localStorage.getItem('rtl') || themeConfig.rtlClass))
    dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation))
    dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar))
    dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark))

    const locale = localStorage.getItem('i18nextLng') || themeConfig.locale
    dispatch(toggleLocale(locale))
    // i18n.changeLanguage(locale)

  }, [dispatch])

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    const screenLoader = document.getElementsByClassName('screen_loader')
    if (screenLoader?.length > 0) {
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }

    // const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

    return () => {

      window.removeEventListener('scroll', onScrollHandler);
    }

  })

  return (
    <div
      className={`${(themeConfigSelector.sidebar && 'toggle-sidebar') || ''} ${themeConfigSelector.menu} ${themeConfigSelector.layout} ${themeConfigSelector.rtlClass
        } main-section relative font-nunito text-sm font-normal antialiased`}>
      <div className="relative">
        {showLoader && (
          <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
            <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
              <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
              </path>
              <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        )}
      </div>
      <div className={`${(!themeConfigSelector.sidebar && 'hidden') || ''} fixed inset-0 z-50 bg-[black]/60 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>
      <div className="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
        {showTopButton && (
          <button type="button" className="btn btn-outline-primary animate-pulse rounded-full bg-[#fafafa] p-2 dark:bg-[#060818] dark:hover:bg-primary" onClick={goToTop}>
            <svg width="24" height="24" className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        )}
      </div>
      <div className={`${themeConfigSelector.navbar} main-container min-h-screen text-black dark:text-white-dark`}>
        <Sidebar />
        <div className="main-content">
          <Head />
          <div className={`${animation} animate__animated p-6`}>
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
