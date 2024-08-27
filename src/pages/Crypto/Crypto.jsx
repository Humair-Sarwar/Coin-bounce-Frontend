import { useEffect, useState } from "react";
import { getCryptoApi } from "../../api/external";
import Loader from "../../components/Loader/Loader";

const Crypto = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    (async function cryptoApiCall(){
      const response = await getCryptoApi();
      setData(response);
    })();
  }, []);
  const crypto24Negative = {
    color: 'red'
  };
  const crypto24Positive = {
    color: 'green'
  }
  if(data.length == 0){
    return <Loader text='Cryptocurriences'/>
  }
  
  return (
    <div className="crypto-container">
      <h1>Cryptocurriences</h1>
      {data.code == "ERR_NETWORK" ? <p style={{textAlign: 'center'}}>You have limited reload crypto data!</p> : <div className="crypto-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th className="sr-no">#</th>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price</th>
              <th className="time-24">24h</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record)=>(
              <tr key={record.id}>
              <td>{record.market_cap_rank}</td>
              <td className="text-with-symbol"><div className="inner-text">
                <img height={30} src={record.image} alt="" /> <p>{record.name}</p></div></td>
              <td>{record.symbol}</td>
              <td>${record.current_price}</td>
              <td style={record.price_change_percentage_24h > 0 ? crypto24Positive : crypto24Negative}>{record.price_change_percentage_24h}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Crypto;
