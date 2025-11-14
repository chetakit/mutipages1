
const AppHeader = () => {
  return (
    <div
      style={{
        border: "3px solid #00BFFF",      //เปลี่ยนสีขอบ
        borderRadius: "15px",         //ขอบโค้ง
        padding: "20px",
        margin: "20px auto",
        width: "fit-content",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", //เงา
      }}
    >
      <i><h1 className="text-center" style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",}}>67150490 - เชษฐกิตติ์ สืบสุขสันติ</h1></i>
    </div>
  );
};

export default AppHeader;

