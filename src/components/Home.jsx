import React, {useState, useEffect} from 'react'
import "../App.css"
import {useLazyQuery, gql} from "@apollo/client"

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
    const [weatherSearch, setWeatherSearch] = useState("");
    const [searchWeather, {data, loading, error}] = useLazyQuery(QUERY_GET_WEATHER, {
        variables: {name: city}
    });

    if(error) return <h1>Error found</h1>
    if(data) {
        console.log(data)
    }

    return (
        <div className="Home">
            <div className="input">
                <div className="input-titulo">
                    <h1>Search For Weather</h1>
                </div>
                <div className="input-campo">
                    <input type="text" onChange={(event) => {setCity(event.target.value)}}/>
                    <button onClick={() => searchWeather()}>Consult</button>
                </div>

            </div>

        </div>
        
    )
}

export default Home