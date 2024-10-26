import {PiTelegramLogoLight} from 'react-icons/pi';
import { FaXTwitter } from "react-icons/fa6";

export const Socials = () => {
  return (<div className="flex items-center space-x-4">
    <PiTelegramLogoLight className="text-white text-xl lg:text-3xl"/>
    <FaXTwitter className="text-white text-xl lg:text-3xl"/>
  </div>)
}
