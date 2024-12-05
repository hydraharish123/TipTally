import { useState } from "react";
const formOptions = [
  { description: "Dissatisfied (0%)", percentage: 0 },
  { description: "It was Okay (5%)", percentage: 5 },
  { description: "It was good (10%)", percentage: 10 },
  { description: "Absolutely Amazing (20%)", percentage: 20 },
];

export default function App() {
  const [billamt, setBillamt] = useState("");
  const [yourReply, setYourReply] = useState(0);
  const [friendReply, setFriendReply] = useState(0);

  function handleBtnClick() {
    setBillamt("");
    setYourReply(0);
    setFriendReply(0);
  }

  return (
    <div className="App">
      <Bill billamt={billamt} onhandleBillamt={setBillamt} />
      <Reply reply={yourReply} setReply={setYourReply}>
        How did you like the Service
      </Reply>
      <Reply reply={friendReply} setReply={setFriendReply}>
        How did your friend like the service
      </Reply>
      <DisplayTotal
        billamt={billamt}
        yourReply={yourReply}
        friendReply={friendReply}
      />
      <ResetButton onhandleBtn={handleBtnClick} />
    </div>
  );
}

function Bill({ billamt, onhandleBillamt }) {
  function handleBill(e) {
    console.log(Number(e.target.value));
    onhandleBillamt(Number(e.target.value));
  }
  return (
    <form>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Enter bill amt..."
        value={billamt}
        onChange={handleBill}
      ></input>
    </form>
  );
}
function Reply({ reply, setReply, children }) {
  function handleReply(e) {
    setReply(Number(e.target.value));
  }
  return (
    <div>
      <label>{children}</label>
      <select value={reply} onChange={handleReply}>
        {formOptions.map((item) => (
          <option value={item.percentage} key={item.percentage}>
            {item.description}
          </option>
        ))}
      </select>
    </div>
  );
}

function DisplayTotal({ billamt, yourReply, friendReply }) {
  const avgTip = (yourReply + friendReply) / 2;
  const tipAmt = Math.round((avgTip * billamt) / 100);
  return (
    billamt > 0 && (
      <h3>
        You pay ${billamt + tipAmt} (${billamt} + ${tipAmt} tip)
      </h3>
    )
  );
}

function ResetButton({ onhandleBtn }) {
  return <button onClick={onhandleBtn}>Reset</button>;
}
