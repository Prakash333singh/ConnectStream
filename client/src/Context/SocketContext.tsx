import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction } from "../Actions/peerAction";

// const WS_Server = "http://localhost:5500";
const WS_Server = "http://localhost:3000";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server, { 
    withCredentials: false,
    transports: ["polling", "websocket"]
});

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate(); // will help to programatically handle navigation
    
    // state variable to store the userId 
    const [user, setUser] = useState<Peer>(); // new peer user
    const [stream, setStream] = useState<MediaStream>();

    const [peers, dispatch] = useReducer(peerReducer, {}); // peers->state

    const fetchParticipantList = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log("Fetched room participants");
        console.log(roomId, participants);
    }

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
        setStream(stream);
    } 

    useEffect(() => {

        const userId = UUIDv4();
        const newPeer = new Peer(userId, {
            host: "localhost",
            // Refers to the PeerJS server running locally.
            port: 9000,
            // Refers to the port where your PeerJS server is running (separate from your web app).
            path: "/myapp"
            // The path that PeerJS will use for signaling.
        });

        setUser(newPeer);

        fetchUserFeed();

        const enterRoom = ({ roomId} : { roomId: string}) => {
            navigate(`/room/${roomId}`); 
        }

        // we will transfer the user to the room page when we collect an event of room-created from server
        socket.on("room-created", enterRoom);

        socket.on("get-users", fetchParticipantList);
    }, []);

    useEffect(() => {

        if(!user || !stream) return;

     socket.on("user-joined", ({ peerId }) => {
    const call = user.call(peerId, stream);
    console.log("Calling the new peer", peerId);

    // Listen for the incoming peer's stream
    call.on("stream", (peerStream) => {
        console.log("Received stream from peer", peerId);
        dispatch(addPeerAction(peerId, peerStream)); // Use the new stream from the peer
    });
});

        user.on("call", (call) => {
            // what to do when other peers on the group call you when u joined
            console.log("receiving a call",call.peer);
            call.answer(stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerAction(call.peer, peerStream));
            })
        })

        socket.emit("ready");
    }, [user, stream])

    return (
        <SocketContext.Provider value={{ socket, user, stream, peers }}>
            {children}
        </SocketContext.Provider>
    );
}