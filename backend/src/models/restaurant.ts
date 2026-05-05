import mongoose from 'mongoose'
const {Schema}=mongoose

type Rating={
    userId:mongoose.Types.ObjectId,
    description:string,
    rating:number,
    createdAt?: Date,
    updatedAt?: Date
}
export type RestaurantType={
    name: string,
    description: string,
    categories?: string[],
    location: GeoLocation,
    address: string,
    sumRating: number,
    ratings:Rating[],
    createdAt?: Date,
    updatedAt?: Date
}

const ratingSchema=new Schema<Rating>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    }
},{ timestamps: true })
const restaurantSchema=new Schema<RestaurantType>({
    name:{           
    type: String,
    required: true,
    trim: true
    },
    description:{           
    type: String,
    required: true,
    trim: true
    },
    categories:{           
    type: [String],
    required: false,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address:{           
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    sumRating:{
        type:Number,
        default:0
    },
    ratings:[ratingSchema]
},{ timestamps: true })

restaurantSchema.index({location: "2dsphere"})
type GeoLocation={
    type: 'Point',
    coordinates: number[]
}



export default mongoose.model<RestaurantType>('Restaurant', restaurantSchema)