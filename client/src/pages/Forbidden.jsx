import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-text/70">You don't have permission to access this page.</p>
      <Link to="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default Forbidden;
