import { TControlIcons } from "./controls-configs"
import clsx from "clsx"
import { getControlImgPath } from "./getControlImgPath"

type Props = {
  name: string
  hovered: string | undefined
  icons: TControlIcons
}

export const ControlsTableRow: React.FunctionComponent<Props> = ({
  name,
  hovered,
  icons,
}) => {
  return (
    <tr className={clsx(hovered === name && "bg-[cadetblue]")}>
      <td>{name}</td>

      <td>
        <img
          src={getControlImgPath(icons.keyboard.path)}
          alt=""
          className="h-8 max-w-none"
          style={{ imageRendering: "pixelated" }}
          title={icons.keyboard.tooltip}
          key={icons.keyboard.path}
        />
      </td>

      <td>
        <img
          src={getControlImgPath(icons.ps.path)}
          alt=""
          className="h-8 max-w-none"
          style={{ imageRendering: "pixelated" }}
          title={icons.ps.tooltip}
          key={icons.ps.path}
        />
      </td>

      <td>
        <img
          src={getControlImgPath(icons.xbox.path)}
          alt=""
          className="h-8 max-w-none"
          style={{ imageRendering: "pixelated" }}
          title={icons.xbox.tooltip}
          key={icons.xbox.path}
        />
      </td>
    </tr>
  )
}
