import React, { useRef } from "react"
import Peer from "peerjs"

type TWebRTCContext = {
  peerRef: React.MutableRefObject<Peer | null>
}

export const WebRTCContext = React.createContext<TWebRTCContext | null>(null)

type Props = {
  children: React.ReactNode
}

export const WebRTC: React.FunctionComponent<Props> = ({ children }) => {
  const peerRef = useRef<Peer | null>(null)

  return (
    <WebRTCContext.Provider value={{ peerRef }}>
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
