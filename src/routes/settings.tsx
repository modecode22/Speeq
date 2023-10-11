import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ToggleThemeBtn from "../components/ToggleThemeBtn";
import { motion } from 'framer-motion'
import { AnimatedButtonVariants } from "../lib/animation-utils";
import SelectOutputDevice from "../components/SelectOutputDevice";
import SelectToLang from "../components/SelectToLang";
import SelectFromLang from "../components/SelectFromLang";
import SelectInputDevice from "../components/SelectInputDevice";
const Settings = () => {
  return (
    <section>
      <header className="flex  items-center w-full justify-end p-3 gap-3">
            <motion.button initial={'initial'} exit={'exit'} whileHover={'hover'} animate={'animate'}  variants={AnimatedButtonVariants}>
   <Link to={"settings"}>
          <RiArrowGoBackFill className="w-6 h-6" />
        </Link>       </motion.button>

      </header>
      <main className="p-5 flex flex-col gap-5 select-none">
        <section className="flex flex-col ">
          <label htmlFor="theme" className="px-2">
             Input Device  :
          </label>
          <SelectInputDevice />
        </section>
        <section className="flex flex-col ">
          <label htmlFor="theme" className="px-2">
             Output Device  :
          </label>
          <SelectOutputDevice />
        </section>
        <section className="flex flex-col ">
          <label htmlFor="theme" className="px-2">
            Translate from :
          </label>
          <SelectFromLang />
        </section>
        <section className="flex flex-col ">
          <label htmlFor="theme" className="px-2">
             To :
          </label>
          <SelectToLang />
        </section>
        <section className="flex flex-col ">
          <label htmlFor="theme" className="px-2">
            theme :
          </label>
          <ToggleThemeBtn />
        </section>
      </main>
    </section>
  );
};

export default Settings;
