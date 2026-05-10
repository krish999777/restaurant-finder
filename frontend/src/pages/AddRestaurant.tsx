import './AddRestaurant.css'
import {useState,useEffect} from 'react'
import { MapContainer, TileLayer, Marker,useMap,useMapEvents } from 'react-leaflet'

function RecenterMap({coords}:{coords:[number,number]}):null{
    const map=useMap()
    useEffect(()=>{
        if(coords){
            map.setView(
                [coords[1], coords[0]],
                15
            )
        }   
    },[coords,map])
    return null
}
function MapEvents({setCoords}):null{
    useMapEvents({
        click(e){
            setCoords([e.latlng.lng,e.latlng.lat])
        }
    })
    return null
}
export default function(){
    const [coords,setCoords]=useState<null|[number,number]>(null)

    function getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(position=>{
            setCoords([position.coords.longitude,position.coords.latitude])
        })
    }

    return(
        <div>
            <form>
                <input type="text" required={true} name="name"/>
                <input type="text" required={true} name="description"/>
                <input type="text" required={true} name="address"/>
                <input type="checkbox" name="category" value="veg"/>
                <input type="checkbox" name="category" value="fast-food"/>
                <input type="checkbox" name="category" value="cafe"/>
                <input type="checkbox" name="category" value="casual"/>
                <input type="checkbox" name="category" value="dining"/>
                <input type="checkbox" name="category" value="buffet"/>
                <input type="checkbox" name="category" value="pizzeria"/>
                <div className="addrestaurant-map">
                    <MapContainer
                        center={coords?[coords[1],coords[0]]:[18.9582,72.8320]}
                        zoom={15}
                        scrollWheelZoom={false}
                    >
                        <RecenterMap coords={coords}/>
                        <MapEvents setCoords={setCoords}/>
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                        />
                        {coords?<Marker
                            position={[coords[1],coords[0]]}
                        />:''}
                    </MapContainer>
                </div>
                <button type="button" onClick={getCurrentLocation}>Use current location</button>
            </form>
        </div>
    )
}