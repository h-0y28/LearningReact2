import React from "react";

function Hello(props) {
  return (
    <div style={{ color: props.color }}>
      {props.isSpecial && <>*</>}안녕하세요 {props.name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름 없음",
};

export default Hello;
