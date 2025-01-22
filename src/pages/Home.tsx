import ReactImitation, { useState, navigate } from '@ReactImitation';
import { FunctionalComponent } from '../component/FunctionalComponent';

export const Home = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);

  return (
    <div>
      <button
        onClick={() => {
          console.log('CLICKED');
          navigate('/test');
        }}
      >
        move to TestPage T
      </button>
      <FunctionalComponent count={count1} setCount={setCount1} />
      <li>{count1}</li>
      <li>{count2}</li>
      <button className="button1" onClick={() => setCount1(count1 + 1)}>
        Click me
      </button>
      <button className="button2" onClick={() => setCount2(count2 + 1)}>
        Click me
      </button>
      <button onClick={() => navigate('/test')}>move to TestPage</button>

      <FunctionalComponent count={count1} setCount={setCount1} />
      <FunctionalComponent count={count2} setCount={setCount2} />

      <div>
        <div>
          hi
          <li>{count1}</li>
          <li>{count2}</li>
          <button className="button1" onClick={() => setCount1(count1 + 1)}>
            Click me
          </button>
          <button className="button2" onClick={() => setCount2(count2 + 1)}>
            Click me
          </button>
          <FunctionalComponent count={count1} setCount={setCount1} />
          <FunctionalComponent count={count2} setCount={setCount2} />
          <div>
            <div>
              hi
              <li>{count1}</li>
              <li>{count2}</li>
              <button className="button1" onClick={() => setCount1(count1 + 1)}>
                Click me
              </button>
              <button className="button2" onClick={() => setCount2(count2 + 1)}>
                Click me
              </button>
              <FunctionalComponent count={count1} setCount={setCount1} />
              <FunctionalComponent count={count2} setCount={setCount2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
