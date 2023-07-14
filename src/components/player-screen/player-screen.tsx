import { useEffect, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"

export const PlayerScreen = () => {
  const { peerRef, dataConnectionRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()
  const [dataConnectionReady, setDataConnectionReady] = useState(false)

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      dataConnectionRef.current = conn

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })

      setDataConnectionReady(true)
    })

    console.log({ peerRef })
  }, [])

  const onSendSomething = () => {
    dataConnectionRef.current!.send(Math.random())
  }

  return (
    <div>
      <h2>Player screen</h2>
      {peerId && <p>My peer ID is: {peerId}</p>}
      {dataConnectionReady && (
        <button onClick={onSendSomething}>send something</button>
      )}
    </div>
  )
}
