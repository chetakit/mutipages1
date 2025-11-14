import { Link } from 'react-router-dom';

const AppFooter = () => {
  return (
    <h4 className="text-center">
      <Link to={'url'}>
        <i className="bi bi-facebook"></i>
      </Link>
    </h4>
  );
};

export default AppFooter;  // เปลี่ยนชื่อเป็น AppFooter ให้ตรง
