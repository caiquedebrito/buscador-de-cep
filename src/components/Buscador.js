import React, { useState } from "react";
import img from "../search.png";

export default function Buscador() {
  const [cep, setCep] = useState();
  const [data, setData] = useState({
    logradouro: "",
    uf: "",
    localidade: "",
    ddd: "",
  });

  function searchCep() {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }
    return fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
  }

  async function search() {
    if (checkCep()) {
      try {
        document.querySelector('.loader').classList.add('loading')
        const response = await searchCep()
        const data = await response.json()
        if (!data.erro)
          setData({
            localidade: data.localidade,
            ddd: data.ddd,
            uf: data.uf,
            logradouro: data.logradouro
          })
        else {
          alert("Cep não encontrado! :(")
        }
      }catch(err) {
        console.log('Ops!', err.mesage)
      }
      finally {
        document.querySelector('.loader').classList.remove('loading')
      }
    } else {
      alert("Formato inválido");
    }
  }

  function checkCep() {
    const regex = /\d{8}/;
    return cep.match(regex);
  }

  return (
    <div className="container">
      <h1>Buscador de CEP</h1>
      <div className="search">
        <input
          type="text"
          placeholder="XXXXXXXX"
          maxLength={8}
          onChange={(e) => {
            setCep(e.target.value);
          }}
        />
        <button onClick={search}>
          <img src={img} alt="Search Button" />
        </button>
      </div>

      <div className="loader">

      </div>

      <div className="result">
        <h2>Logradouro:</h2>
        <div>{data.logradouro}</div>
        <h2>Estado:</h2>
        <div>{data.uf}</div>
        <h2>Local:</h2>
        <div>{data.localidade}</div>
        <h2>DDD:</h2>
        <div>{data.ddd}</div>
      </div>
    </div>
  );
}
