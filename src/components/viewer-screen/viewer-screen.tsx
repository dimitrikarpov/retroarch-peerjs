import { useEffect, useRef, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"

export const ViewerScreen = () => {
  const [playerPeerId, setPlayerPeerId] = useState<string>()
  const playerPeerInputRef = useRef<HTMLInputElement>(null)

  const { peerRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })
    })

    console.log({ peerRef })
  }, [])

  const onAddPlayerIdButtonClick = () => {
    if (!peerRef.current) return

    setPlayerPeerId(playerPeerInputRef.current?.value)

    console.log("HERE")

    const conn = peerRef.current.connect(playerPeerInputRef.current!.value)
    conn.on("open", () => {
      conn.send("hi!")
    })
  }

  console.log("---", playerPeerInputRef.current?.value)

  return (
    <div>
      <h2>Viewer Screen</h2>

      {peerId && <p>My peer ID is: {peerId}</p>}

      {!playerPeerId && (
        <div>
          <input ref={playerPeerInputRef} />
          <button onClick={onAddPlayerIdButtonClick}>add player id</button>
        </div>
      )}
    </div>
  )
}
