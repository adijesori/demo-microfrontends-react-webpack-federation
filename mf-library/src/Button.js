import React, {useState} from 'react';

function Button() {
  const [val, setVal] = useState(false)
  return (
    <button onClick={() => setVal(!val)}>MF Lib Button {String(val)}</button>
  );
}

export default Button;
