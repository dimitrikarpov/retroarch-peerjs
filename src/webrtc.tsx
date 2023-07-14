import React, { useRef } from "react"
import Peer, { DataConnection } from "peerjs"

type TWebRTCContext = {
  peerRef: React.MutableRefObject<Peer | null>
  dataConnectionRef: React.MutableRefObject<DataConnection | null>
}

export const WebRTCContext = React.createContext<TWebRTCContext | null>(null)

type Props = {
  children: React.ReactNode
}

export const WebRTC: React.FunctionComponent<Props> = ({ children }) => {
  const peerRef = useRef<Peer | null>(null)
  const dataConnectionRef = useRef<DataConnection | null>(null)

  return (
    <WebRTCContext.Provider value={{ peerRef, dataConnectionRef }}>
      {children}
    </WebRTCContext.Provider>
  )
}

export function useConnection() {
  const context = React.useContext(WebRTCContext)

  if (!context) {
    throw new Error(
      `'This component must be used within a <WebRTC> component.'`,
    )
  }

  return context
}
