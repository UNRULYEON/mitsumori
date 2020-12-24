export const getFormattedRoomCode = (code: string): JSX.Element => {
  return (<>
    <span className="formatted-code">{code.substr(0, 3)}</span>
    <span className="formatted-code">{code.substr(3, 3)}</span>
    <span className="formatted-code">{code.substr(6)}</span>
  </>)
}