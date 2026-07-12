import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">401</h1>
      <p className="text-text/70">Your session has expired or is invalid. Please sign in again.</p>
      <Link to="/login" className="text-primary hover:underline">
        Go to login
      </Link>
    </div>
  );
};

export default Unauthorized;
