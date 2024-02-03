import enquiryModel from "../models/enquiryModel.js"

enquiryModel

export const acceptEnquiryService = async(enquiryData) =>{
    try {
        const enquiry = await enquiryModel(enquiryData)
        enquiry.save()
        return 'success'
    } catch (error) {
        console.log(error.message)
    }
}
export const getEnquiryService = async() =>{
    try {
        const enquiry = await enquiryModel.find()
        return enquiry
    } catch (error) {
        console.log(error.message)
    }
}



