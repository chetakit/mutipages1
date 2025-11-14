import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <div className="d-flex justify-content-center gap-3" style={{ margin: "20px 0" }}>
      <Link to={"home"}>
        <button className="btn btn-primary nav-btn">Home</button>
      </Link>

      <Link to={"calculator"}>
        <button className="btn btn-primary nav-btn">Calculator</button>
      </Link>

      <Link to={"animation"}>
        <button className="btn btn-primary nav-btn">Animation</button>
      </Link>

      <Link to={"components"}>
        <button className="btn btn-primary nav-btn">Components</button>
      </Link>

      <Link to={"forwardtohome"}>
        <button className="btn btn-danger nav-btn">ForwardToHome</button>
      </Link>

      <Link to={"todos"}>
        <button className="btn btn-info nav-btn">Todos</button>
      </Link>

      <Link to={"product"}>
        <button className="btn btn-success nav-btn">Product</button>
      </Link>
    </div>
  );
};

export default AppNavbar;
