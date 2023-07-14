import { Role } from "../../App"

type Props = {
  setRole: React.Dispatch<React.SetStateAction<Role>>
}

export const RoleSelectScreen: React.FunctionComponent<Props> = ({
  setRole,
}) => {
  return (
    <div>
      <h2>select Your role</h2>

      <button
        onClick={() => {
          setRole("player")
        }}
      >
        player
      </button>
      <button
        onClick={() => {
          setRole("viewer")
        }}
      >
        viewer
      </button>
    </div>
  )
}
