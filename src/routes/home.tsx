import { RiSettings4Line, RiUser3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Recorder from "../components/Recorder";

const Home = () => {
  
  return (
    <section>
      <header className="flex  items-center w-full justify-end p-3 gap-3">
        <Link  to={'settings'}>
          <RiUser3Line className="w-6 h-6" />

        </Link>
      </header>
      <main className="p-5 flex flex-col gap-5 select-none">
        <section className="flex flex-col ">
          <Recorder/>
        </section>
      </main>
    </section>
  );
};

export default Home;
