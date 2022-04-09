import React from 'react'
import {useQuery, gql} from "@apollo/client"
import {Link} from "react-router-dom"
import "../App.css"

const QUERY_LIST_OF_COUNTRIES = gql`
    query{
        getCityByName(name: ""){
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

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home