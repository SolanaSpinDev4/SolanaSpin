import React from "react";
// import styles from './Balance.module.css';

const Balance: React.FC<{ videoId: number | null }> = () => {
  // const [balance, setBalance] = useState<number>(10000);

  // useEffect(() => {
  //   console.log('videoId in Balance')
  //   console.log(videoId)
  //   if (videoId === 1) {
  //     setBalance(balance);
  //   } else if (videoId === 2) {
  //     const bl = balance * 2
  //     console.log(balance);
  //     setBalance(bl);
  //     console.log(balance);
  //   } else if (videoId === 3) {
  //     const bl = balance * 3;
  //     console.log(balance);
  //     setBalance(bl);
  //     console.log(balance);
  //   } else if (videoId === 4) {
  //     console.log(balance);
  //     const bl = balance * 4
  //     console.log(balance);
  //     setBalance(bl);
  //   } else {
  //     console.log(balance);
  //     setBalance(balance)
  //     console.log(balance);
  //   }
  // }, [videoId]);

  return (
    <div className="font-bold text-xl z-20">
      <span>Balance: ${balance.toFixed(2)}</span>
    </div>
  );
};

export default Balance;
