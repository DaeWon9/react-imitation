import ReactImitation, { useRef, navigate } from '@ReactImitation';

export const TestPage = () => {
  const counterRef = useRef(10);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  const incrementCounter = () => {
    counterRef.current = counterRef.current + 1;
    console.log(counterRef.current);
  };

  const changeColor1 = () => {
    if (divRef1.current) {
      if (divRef1.current.style.backgroundColor === 'blue') {
        divRef1.current.style.backgroundColor = 'red';
      } else {
        divRef1.current.style.backgroundColor = 'blue';
      }
    }
  };

  const changeColor2 = () => {
    if (divRef2.current) {
      if (divRef2.current.style.backgroundColor === 'blue') {
        divRef2.current.style.backgroundColor = 'red';
      } else {
        divRef2.current.style.backgroundColor = 'blue';
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        move to HomePage
      </button>

      <div ref={divRef1} style={'padding: 10px; background-color: red;'}>
        <button onclick={changeColor1}>색상 변화 버튼</button>
      </div>

      <div>
        <button onclick={incrementCounter}>
          카운터 테스트 {counterRef.current}
        </button>
      </div>

      <div ref={divRef2} style={'padding: 10px; background-color: red;'}>
        <button onclick={changeColor2}>색상 변화 버튼</button>
      </div>
    </div>
  );
};
