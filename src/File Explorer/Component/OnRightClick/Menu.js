import useContextMenu from "./useContextMenu";

const Menu = () => {
  const { anchorPoint, show } = useContextMenu();

  if (show) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li>Share to..</li>
        <li>Cut</li>
      </ul>
    );
  }
  return <> <div
    className="fa fa-plus text-black  pointer"
    style={{
      fontSize: '100px',
      marginLeft: '50px',
      marginTop: '40px'
    }} />
  </>;
};

export default Menu;