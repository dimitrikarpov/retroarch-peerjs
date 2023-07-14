import { useEffect, useRef, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"

export const ViewerScreen = () => {
  const [playerPeerId, setPlayerPeerId] = useState<string>()
  const playerPeerInputRef = useRef<HTMLInputElement>(null)

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

    dataConnectionRef.current = conn

    conn.on("open", () => {
      conn.send("hi!")
      setDataConnectionReady(true)
    })

    conn.on("data", (data) => {
      console.log("connection.on.data 222", { data })
    })
  }

  const onSendSomething = () => {
    dataConnectionRef.current!.send(Math.random())
  }

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

      {dataConnectionReady && (
        <button onClick={onSendSomething}>send something</button>
      )}
    </div>
  )
}
