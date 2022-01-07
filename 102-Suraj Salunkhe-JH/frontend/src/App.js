import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <Mycomponent />
    </>
  );
}

function Mycomponent() {
  const appName = "MyChatApp";
  const studentname = "Suraj Salunkhe";
  const Studentid = "210940502102";

  const [Message, setmessge] = useState("");
  const [list, setlist] = useState([]);

  const handlemessage = (e) => {
    setmessge(e.target.value);
  };

  const addmsg = async () => {
    if (Message === "") {
      alert("Please Enter At Least One Text");
      return;
    }
    const url = "http://localhost:3000/addmsg";
    const data = {
      message: Message,
    };
    await axios.post(url, data);
    const newlist = [data, ...list];
    setlist(newlist);
    setmessge("");
  };

  const showmsg = async () => {
    const url = "http://localhost:3000/msg";
    const resp = await fetch(url);
    const list = await resp.json();
    const newlist = [...list];
    setlist(newlist);
  };

  useEffect(() => showmsg(), []);

  return (
    <div>
      <div className="d-flex align-items-center mb-2 bg-secondary p-2">
        <h1 className="p-2 fs-2 text-light">
          <strong>{appName}</strong>
        </h1>
        <h6 className="text-light">
          <em>
            by {studentname} {Studentid}
          </em>
        </h6>
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2 mb-2"
          type="text"
          value={Message}
          placeholder="Lets Chat Here..."
          onChange={handlemessage}
        />
        <input
          className="btn btn-secondary w-25 mb-2"
          type="button"
          value="Send"
          onClick={addmsg}
        />
      </div>

      {list.map((items, index) => (
        <div key={index}>
          <div className="alert-secondary d-flex mb-2 p-2">
            <strong>{items.message}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
