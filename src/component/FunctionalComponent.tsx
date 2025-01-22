import ReactImitation, { useState, useEffect } from '@ReactImitation';
import './FunctionalComponent.css';

export function FunctionalComponent(props: any) {
  const [testState, setTestState] = useState(1);

  useEffect(() => {
    console.log('함수형 컴포넌트가 마운트 되었음');
  }, []);

  return (
    <div className="functional-component-container">
      innerState: {testState}
      outterState: {props.count}
      <br />
      <button
        className="button3"
        onClick={() => {
          setTestState(testState + 1);
        }}
      >
        inner State
      </button>
      <button
        className="button4"
        onClick={() => {
          props.setCount(props.count + 1);
        }}
      >
        outter State
      </button>
    </div>
  );
}
