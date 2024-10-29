import {PiTelegramLogoLight} from 'react-icons/pi';
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

export const Socials = () => {
  return (<div className="flex items-center space-x-4">
    <Link href="https://t.me/solanaspin" target="_blank" rel="noopener noreferrer">
      <PiTelegramLogoLight className="text-white text-xl lg:text-3xl"/>
    </Link>
   <Link href="https://x.com/spinonsol_?s=21&t=8P8xTY1QR-HaV4j_pRZqrw" target="_blank" rel="noopener noreferrer">
     <FaXTwitter className="text-white text-xl lg:text-3xl"/>
   </Link>
  </div>)
}
