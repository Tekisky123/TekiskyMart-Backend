import EnquiryModel from "../models/enquiryModel.js"


export const acceptEnquiryService = async(enquiryData) =>{
    try {
        const enquiry = await EnquiryModel(enquiryData)
        enquiry.save()
        return 'success'
    } catch (error) {
        console.log(error.message)
    }
}
export const getEnquiryService = async() =>{
    try {
        const enquiry = await EnquiryModel.find()
        return enquiry
    } catch (error) {
        console.log(error.message)
    }
}



