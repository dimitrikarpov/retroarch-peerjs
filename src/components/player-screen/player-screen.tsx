import { useEffect, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"

export const PlayerScreen = () => {
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

  return (
    <div>
      <h2>Player screen</h2>
      {peerId && <p>My peer ID is: {peerId}</p>}
    </div>
  )
}
