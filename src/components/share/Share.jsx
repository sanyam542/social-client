import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const SU = process.env.REACT_APP_SERVER_URL;

  const desc = useRef();
  const [file, setFile] = useState(null);

  // console.log(file.name);
  const { user: currentUser } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      console.log(data);
      try {
        axios.post(
          `${SU}upload`,

          data
        );
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(
        `${SU}posts`,

        newPost
      );
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUser.profilePicture
                ? PF + currentUser.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
          />
          <input
            className="shareInput"
            placeholder={"What's in your mind " + currentUser.username + " ?"}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className="shareImg" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo </span>
              <input
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
                type="file"
                id="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
              />
            </label>
            {/* <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
