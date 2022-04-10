import React, {useState, useEffect} from 'react'
import "../App.css"
import {useLazyQuery, gql} from "@apollo/client"
import {BsCheckCircleFill, BsClouds} from "react-icons/bs"
import {BiErrorCircle} from "react-icons/bi"
import {WiThermometer} from "react-icons/wi"

const QUERY_GET_WEATHER = gql`
    query getCityByName($name: String!){
        getCityByName(name: $name){
            name
            country
            weather{
                summary{
                    title
                    description
                }

                temperature{
                    actual
                    feelsLike
                    min
                    max
                }
            }
        }
    }
`

function Home(){
    const [city, setCity] = useState("")
    const [weatherSearch, setWeatherSearch] = useState(false);
    const [searchWeather, {data, loading, error}] = useLazyQuery(QUERY_GET_WEATHER, {
        variables: {name: city}
    });
    const [nullData, setNullData] = useState(false)
    const [tempLocal, setTempLocal] = useState(null)

    function search(e) {
        e.preventDefault();
        if(data == null){
            document.getElementById("sucesso").style.display="none"
            document.getElementById("erro").style.display="block"
        } else{
            document.getElementById("erro").style.display="none"
            document.getElementById("sucesso").style.display="block"
            setTempLocal(Math.ceil(data.getCityByName.weather.temperature.actual - 273.15))
            setTempLocal(Math.ceil(data.getCityByName.weather.temperature.feelsLike - 273.15))
            setTempLocal(Math.ceil(data.getCityByName.weather.temperature.max - 273.15))
            setTempLocal(Math.ceil(data.getCityByName.weather.temperature.min - 273.15))
            setWeatherSearch(true)
            setNullData(false)
        }


    }

    useEffect(() => {
        setWeatherSearch(false)
        if(data == null){
            setNullData(true)
        }
        searchWeather()
        
    }, [city])



    if(error) return <h1>Error found</h1>
    if(data) {
        console.log(data)
    }


    return (
        <div className="Home">
            <div className="input">
                <div className="input-titulo">
                    <h1>Search For <span>Weather</span></h1>
                </div>
                <div className="input-campo">
                    <div className="input-campo-cidade">
                        <input className="cidade-input"type="text" onChange={(event) => {setCity(event.target.value)}} />
                    <div id="sucesso" className="iconeSucesso">
                        <a><BsCheckCircleFill/></a>
                    </div>
                    <div id="erro" className="iconeErro">
                        <a><BiErrorCircle /></a>
                    </div>

                    </div>
                    <button onClick={(e) => search(e)}>Consult</button>
                </div>

            </div>

            <div className="resultado">
                {
                    weatherSearch &&
                    loading ? <h1>Loading...</h1>
                    :
                    weatherSearch && data && !nullData?
                        <div className="resultado-titulo">
                            <h2>Weather now in</h2>
                            <div className="informacoes-local">
                                <h2>{data.getCityByName.name} ({data.getCityByName.country})</h2>
                            </div>
                            <div className="informacoes-gerais">
                                <div className="informacoes-gerais-temp">
                                    <h1>{Math.round(data.getCityByName.weather.temperature.actual - 273.15)}° </h1> 
                                </div>
                                <div className="abaixo-temperatura">
                                    <h3><a><BsClouds/></a>{data.getCityByName.weather.summary.title}</h3>
                                    <h3><a><WiThermometer/></a>Feels like: { Math.round(data.getCityByName.weather.temperature.feelsLike - 273.15) }°</h3>
                                </div>
                                
                                <h3>Max temperature: { Math.round(data.getCityByName.weather.temperature.max - 273.15) }°</h3>
                                <h3>Min temperature: { Math.round(data.getCityByName.weather.temperature.min - 273.15) }°</h3>

                            </div>
                            <div className="informacoes-tempo">
                                <h3>Weather condition: </h3>
                                <h3>{data.getCityByName.weather.summary.description}</h3>
                            </div>
                            
                        </div>
                    :
                        ""
                    }   
            </div>

        </div>
        
    )
}

export default Home