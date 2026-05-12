import {useEffect,useState} from 'react'
import type {SubmitEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import { MapContainer, TileLayer, Marker,useMap,useMapEvents } from 'react-leaflet'

function RecenterMap({coords}:{coords:null|[number,number]}):null{
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
export default function ({postFunction,type,id,name,description,address,categories,coordinates}:{
    postFunction:any
    type:'add'|'edit',
    id?:string,
    name?:string,
    description?:string,
    address?:string,
    categories?:string[],
    coordinates?:[number,number]
}){
    const [coords,setCoords]=useState<null|[number,number]>(coordinates||null)
    const [error,setError]=useState<string|null>(null)
    const [loading,setLoading]=useState<boolean>(false)

    const navigate=useNavigate()

    async function handleSubmit(e:SubmitEvent){
        setError(null)
        setLoading(true)
        e.preventDefault()
        const form=e.target
        const formData=new FormData(form)
        const name=String(formData.get('name'))
        const description=String(formData.get('description'))
        const address=String(formData.get('address'))
        const categories=formData.getAll('category') as string[]
        if(!coords){
            setError('Location missing. Choose location on map or select current location')
            setLoading(false)
            return
        }
        try{
            if(type==='edit'){
                await postFunction(id,{name,description,address,categories,coordinates:coords})
            }else{
                await postFunction({name,description,address,categories,coordinates:coords})
            }
            navigate(type==='add'?'/restaurants':`/restaurants/${id}`)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    function getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(position=>{
            setCoords([position.coords.longitude,position.coords.latitude])
        })
    }


    return(
        <>
            {error ? (
                <div className="error-box">
                    {error}
                </div>
            ) : null}
            {loading ? (
                <div className="loading-box">
                    {type==='add'?'Adding restaurant...':'Editing restauarant...'}
                </div>
            ) : null}
            <form
                className="restaurant-form"
                onSubmit={handleSubmit}
            >
                <div className="form-grid">
                    <div className="field">
                        <label>Restaurant name</label>
                        <input
                            type="text"
                            required={true}
                            name="name"
                            placeholder="Enter restaurant name"
                            defaultValue={type==='edit'?name:''}
                        />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input
                            type="text"
                            required={true}
                            name="address"
                            placeholder="Enter address"
                            defaultValue={type==='edit'?address:''}
                        />
                    </div>
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea
                        required={true}
                        name="description"
                        placeholder="Describe the restaurant..."
                        defaultValue={type==='edit'?description:''}
                    />
                </div>
                <div className="field">
                    <label>Categories</label>
                    <div className="categories-grid">
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="veg" defaultChecked={categories?categories.includes('veg'):false}/>
                            <span>Veg</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="fast-food" defaultChecked={categories?categories.includes('fast-food'):false}/>
                            <span>Fast Food</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="dessert" defaultChecked={categories?categories.includes('dessert'):false}/>
                            <span>Dessert</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="cafe" defaultChecked={categories?categories.includes('cafe'):false}/>
                            <span>Cafe</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="casual" defaultChecked={categories?categories.includes('casual'):false}/>
                            <span>Casual</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="dining" defaultChecked={categories?categories.includes('dining'):false}/>
                            <span>Dining</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="buffet" defaultChecked={categories?categories.includes('buffet'):false}/>
                            <span>Buffet</span>
                        </label>
                        <label className="checkbox-card">
                            <input type="checkbox" name="category" value="pizzeria" defaultChecked={categories?categories.includes('pizzeria'):false}/>
                            <span>Pizzeria</span>
                        </label>
                    </div>
                </div>
                <div className="field">
                    <div className="map-top">
                        <label>Select Location</label>
                        <button
                            type="button"
                            className="location-btn"
                            onClick={getCurrentLocation}
                        >
                            Use current location
                        </button>
                    </div>
                    <div className="location-helper">
                        {coords
                            ? 'Location selected successfully'
                            : 'Click anywhere on the map to choose location'}
                    </div>
                    <div className="addrestaurant-map">
                        <MapContainer
                            center={coords ? [coords[1],coords[0]] : [18.9582,72.8320]}
                            zoom={15}
                            scrollWheelZoom={false}
                        >
                            <RecenterMap coords={coords}/>
                            <MapEvents setCoords={setCoords}/>
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                            />
                            {coords ? (
                                <Marker
                                    position={[coords[1],coords[0]]}
                                />
                            ) : null}
                        </MapContainer>
                    </div>
                </div>
                <button
                    disabled={loading}
                    className="submit-btn"
                >
                    {loading ?type==='add'? 'Adding...' :'Editing':type==='add'? 'Add Restaurant':'Edit Restaurant'}
                </button>
            </form>
        </>
    )
}