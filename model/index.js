const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
     
    },
    phone: {
      type: String,
     },
  
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },    
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

contactSchema.virtual('status').get(function () {
  if (this.favorite === true) {
    return 'favorite'
  }
  return 'not favorite'
})

contactSchema.path('name').validate(function (value) {
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact