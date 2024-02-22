import Header from "@/views/components/header";
import NavBar from "@/views/components/navbar";
import { HomeLists } from "./HomeLists";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <HomeLists />
    </div>
  );
};
