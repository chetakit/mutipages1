import RadixCounter from '../Components/RadixCounter'
import Value from '../Components/Value';
import Adder from '../Components/Adder';
import Temperature from '../Components/Temperature'
import Timer from '../Components/Timer';

const Components = ({ counter, setCounter }) => {
  return (
    <div style={{
      width: "220%",
      maxWidth: "1500px",
      margin: "20px auto",
      padding: "20px",
      border: "2px solid black",
      borderRadius: "15px",
      backgroundColor: "#f0f0f0"
    }}>
      {/* แถวแรก: COUNTER + TIMER */}
      <div className="row mb-3">
        <div className="col-md-6">
          <Value name="COUNTER" value={counter} setValue={setCounter} type="integer" />
        </div>
        <div className="col-md-6">
          <Adder />
        </div>
      </div>

      {/* แถวสอง: ADDER */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <Timer />
        </div>
      </div>

      {/* แถวสุดท้าย: TEMPERATURE */}
      <div className="row">
        <div className="col">
          <Temperature />
        </div>
      </div>

      {/* ชื่อ */}
      <div className="pt-3 fw-bold text-center">
        <i>นาย เชษฐกิตติ์ สืบสุขสันติ 67150490</i>
      </div>
    </div>
  );
};


export default Components;
