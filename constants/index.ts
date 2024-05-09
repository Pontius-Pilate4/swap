import React from 'react'
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

export const navLinks = [
  {
    name: 'Pi Blockchain',
    link: '/',
  },
  {
    name: 'Pi Developers',
    link: '/developers',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Support',
    link: '/support',
  },
] as const

export const PiBlockchain = [
  {
    name: 'Pi Node',
    link: '/pi-node',
  },
  {
    name: 'Pi BlockExplorer',
    link: '/pi-blockexplorer',
  },
  {
    name: 'Pi Whitepaper',
    link: '/pi-whitepaper',
  },
] as const

export const PiDeveloper = [
  {
    name: 'Pi Hackathon',
    link: '/pi-hackathon',
  },
] as const

export const socialLinks = [
  {
    name: 'twitter',
    link: 'https://twitter.com/PiCoreTeam',
    icon: React.createElement(Twitter),
  },
  {
    name: 'facebook',
    link: 'https://web.facebook.com/PiCoreTeam/',
    icon: React.createElement(Facebook),
  },
  {
    name: 'youtube',
    link: 'https://www.youtube.com/c/PiCoreTeam',
    icon: React.createElement(Youtube),
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/pi_network/',
    icon: React.createElement(Instagram),
  },
]

export const footerLinks1 = [
  {
    name: 'Pi Whitepaper',
    link: 'https://minepi.com/white-paper/',
  },
  {
    name: 'Support & FAQ',
    link: '/support',
  },
  {
    name: 'Terms of Service',
    link: '/terms-of-service',
  },
] as const

export const footerLinks2 = [
  {
    name: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    name: 'Developer Terms of Use',
    link: '/developer-terms-of-use',
  },
  {
    name: 'Pi Trademark',
    link: '/pi-trademark',
  },
]
