import mongoose from 'mongoose'
const {Schema}=mongoose
const restaurantSchema=new Schema({
    name:{           
    type: String,
    required: true,
    unique: false,
    lowercase: true,
    trim: true
    },
    description:{           
    type: String,
    required: true,
    lowercase: true,
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
    rating:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    }

},{ timestamps: true })

restaurantSchema.index({location: "2dsphere"})
type GeoLocation ={
    type: 'Point',
    coordinates: number[]
}

type Restaurant ={
    name: string,
    description: string,
    categories?: string[],
    location: GeoLocation,
    address: string,
    rating?: number,
    ratingCount?:number,
    createdAt?: Date,
    updatedAt?: Date
}

export default mongoose.model<Restaurant>('restaurants', restaurantSchema)