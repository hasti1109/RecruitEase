import RecruiterSidebar from "../../components/RecruiterSidebar";

const HomePage = () => {
  return (
    <div className="flex">
      <RecruiterSidebar/>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home page</h1>
      </div>
    </div>
  );
}

export default HomePage
