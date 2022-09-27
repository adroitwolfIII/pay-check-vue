import service from '@/config/service'

const payApi = {}

const baseUrl = '/pay'

payApi.insertItem = (form)=>{
    return service({
        url: `${baseUrl}/insert`,
        data: {
            name:form.name,
            date:form.date,
            jcgz:form.jcgz,
            ksf:form.ksf,
            jcjx:form.jcjx,
            glgz:form.glgz,
            dhbz:form.dhbz,
            jtbz:form.jtbz,
            jbbz:form.jbbz,
            ldbx:form.ldbx,
            sybx:form.sybx,
            ylbx:form.ylbx,
            grsds:form.grsds,
            gjj:form.gjj,
        },
        method: 'post'
    })
}


payApi.search = (start_date,end_date)=>{
    return service({
        url: `${baseUrl}/search`,
        params:{
            startDate:start_date,
            endDate:end_date
        },
        method: 'get'
    }) 
}
export default payApi