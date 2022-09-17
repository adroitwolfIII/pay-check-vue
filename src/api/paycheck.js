import service from '@/config/service'

const payApi = {}

const baseUrl = '/pay'

payApi.insertItem = (form)=>{
    return service({
        url: `${baseUrl}/insert`,
        data: {
            name:form.name,
            date:form.date,
            title:form.title,
            value:form.value
        },
        method: 'post'
    })
}


payApi.search = (name,start_date,end_date)=>{
    return service({
        url: `${baseUrl}/search`,
        params:{
            name:name,
            startDate:start_date,
            endDate:end_date
        },
        method: 'get'
    }) 
}
export default payApi