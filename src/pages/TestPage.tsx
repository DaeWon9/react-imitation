import ReactImitation, { useEffect, useState, navigate } from '@ReactImitation';

export const TestPage = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);
  const [count3, setCount3] = useState(3);

  useEffect(() => {
    console.log('TestPage가 마운트 되었음');
  }, []);

  return (
    <div>
      hi
      <li>{count1}</li>
      <li>{count2}</li>
      <li>{count3}</li>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        move to HomePage
      </button>
    </div>
  );
};
