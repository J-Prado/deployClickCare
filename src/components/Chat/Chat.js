import React, { useRef } from "react";
import "./chat.css";
import Conversations from "../Conversation/Conversations";
import Message from "../Message/Message";
// import ChatOnline from "../ChatOnline/ChatOnline";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, postMessage } from "../../redux/action";
import { io } from "socket.io-client";

export default function Chat() {
  // console.log("me monto");
  const dispatch = useDispatch();
  // obtenemos el id de user
  const user = jwt.decode(localStorage?.getItem("session"));
  // console.log(jwt.decode(localStorage?.getItem("session")));
  const id = user?.id;
  // obtenemos el estado conversations
  const conversations = useSelector((state) => state.conversations);
  //seteamos el current chat y message en estados locales
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const members = currentChat
    ? { member: [currentChat.senderId, currentChat.receiverId] }
    : null;

  // console.log("a ver si esta si", arrivalMessage);
  useEffect(() => {
    socket.current = io("https://clickcarechat.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  // console.log("testing", currentChat?.senderId);
  useEffect(() => {
    arrivalMessage &&
      members?.member.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, members?.member]);

  useEffect(() => {
    socket.current.emit("addUser", user?.id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    dispatch(getConversations(id));
  }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        const res = await axios.get(
          `https://api-rest-pf-production.up.railway.app/api/allmessage/${currentChat?.id}`
        );
        setMessages(res.data);
      }
    };
    getMessages();
  }, [currentChat]);

  const [newMessage, setNewMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const messages = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat
      ? currentChat.senderId === user.id
        ? currentChat.receiverId
        : currentChat.senderId
      : null;

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newMessage,
    });
    //linea para que se muestren los mensajes que vamos agregando
    setMessages([...message, messages]);
    dispatch(postMessage(messages));
    setNewMessage("");
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((e) => (
              <div onClick={() => setCurrentChat(e)}>
                <Conversations
                  id={e.id}
                  name={
                    e.receiverName === user.name ? e.senderName : e.receiverName
                  }
                  img={
                    e.receiverName === user.name ? e.senderImg : e.receiverImg
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <div className="chat-header">
              <img
                className="imgHeader"
                src={
                  currentChat?.receiverName === user.name
                    ? currentChat?.senderImg
                    : currentChat?.receiverImg
                }
                alt="avatar"
              />

              <div class="chat-about">
                <div class="chat-with">
                  Chat con{" "}
                  {currentChat?.receiverName === user.name
                    ? currentChat?.senderName
                    : currentChat?.receiverName}
                </div>
                <div class="chat-num-messages">
                  Tiene un total de {message.length} mensajes
                </div>
              </div>
            </div>
          ) : null}
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {message.map((e) => (
                    <div ref={scrollRef}>
                      <Message
                        message={e}
                        img={
                          Number(e.sender) === currentChat.senderId
                            ? currentChat.senderImg
                            : currentChat.receiverImg
                        }
                        own={Number(e.sender) === user.id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write someting"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noConversationText">
                Abri una conversaciones para empezar a chatear
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
