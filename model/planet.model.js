const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const planetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'Dark'
    },
    icon: {
        type: String,
        default: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACCklEQVRIie3W32vOURwH8Nc8eSRtTX4+NmFFUS7UCiEXStGucKHkH3DFBeVmipIk5VK7o0hZSlKU4mIXSotafpTViBLG5sekWXNxztrX03meZ995rtbedW4+n3Pe78/nnM/n8/0yi5mOhhx7m7EPHdiA1nj+I3pxH9fxrV7BzcNJfMV4jTWETsytRVor4xZ0Y3POYJ/iEZZhMb7gAx7iNsaqHS5hQO0s865elAoVRIt4gPU5M03hAi6hD2si56pKm4/nzKLaOpfhbYu2zynRJgzXUbgjw70r2l6khA/XUfQe5kTeIp5Fe2dKuLtOok+wMHIWhB4fxyvMTwn31UH0lvBkhDlw1WSfb0qJljDyH4LfccTkfCihJ/p+YEdKtA390xQcRRdWZvgO4FP0/0Z7SnQF3k9DcAzXsDbDtRo3y/b1pUSLmeuYasavcSre0gSacUb6qW6khI9G5wCW4Gzi8Kgwfy9iu39n/CKcFgqnUqCHUsITvbU/Y2vCFuzERqEyy7ENV/Crxu0MYUFKeDBuaEk5MyjEYM4LVz3VOjiWImvAXewRvhqX8RI/heZvFQqnHVvRWCO4cjwWnuZPyrkOb3JkMNXVj6WVIioIV92Ft0LfjQi/M8+FsTdejaACerBX+PhPG0WhdapV7cQaxAl1+PXJohEHsVuYt8uj/Z0wIO4IM3o4B+csZjD+AnCOSLVvULoHAAAAAElFTkSuQmCC"/>'
    }
}, {timestamps: true});

planetSchema.plugin(AutoIncrement, {inc_field: 'planetId'});

const Planet = mongoose.model('Planets', planetSchema);
module.exports = Planet;